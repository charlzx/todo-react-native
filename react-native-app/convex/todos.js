"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompleted = exports.updateTodo = exports.updateTodoOrder = exports.deleteTodo = exports.toggleTodo = exports.createTodo = exports.getTodos = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// Get all todos ordered by their order field
exports.getTodos = (0, server_1.query)({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        // Sort by order field, fallback to createdAt if order doesn't exist
        return todos.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            return (a.createdAt || 0) - (b.createdAt || 0);
        });
    },
});
// Create a new todo
exports.createTodo = (0, server_1.mutation)({
    args: {
        text: values_1.v.string(),
        description: values_1.v.optional(values_1.v.string()),
        dueDate: values_1.v.optional(values_1.v.string()),
    },
    handler: async (ctx, args) => {
        // Get the highest order value to add new todos at the beginning
        const todos = await ctx.db.query("todos").collect();
        const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order || 0)) : -1;
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            description: args.description || "",
            dueDate: args.dueDate || "",
            status: "onProgress",
            order: maxOrder + 1,
            createdAt: Date.now(),
        });
        return todoId;
    },
});
// Toggle todo status
exports.toggleTodo = (0, server_1.mutation)({
    args: { id: values_1.v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo)
            throw new Error("Todo not found");
        await ctx.db.patch(args.id, {
            status: todo.status === "onProgress" ? "Completed" : "onProgress",
        });
    },
});
// Delete a todo
exports.deleteTodo = (0, server_1.mutation)({
    args: { id: values_1.v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
// Update todo order (for drag and drop)
exports.updateTodoOrder = (0, server_1.mutation)({
    args: {
        updates: values_1.v.array(values_1.v.object({
            id: values_1.v.id("todos"),
            order: values_1.v.number(),
        })),
    },
    handler: async (ctx, args) => {
        for (const todo of args.updates) {
            await ctx.db.patch(todo.id, { order: todo.order });
        }
    },
});
// Update a todo's text, description, and dueDate
exports.updateTodo = (0, server_1.mutation)({
    args: {
        id: values_1.v.id("todos"),
        text: values_1.v.string(),
        description: values_1.v.optional(values_1.v.string()),
        dueDate: values_1.v.optional(values_1.v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text,
            description: args.description || "",
            dueDate: args.dueDate || "",
        });
    },
});
// Delete all completed todos
exports.deleteCompleted = (0, server_1.mutation)({
    handler: async (ctx) => {
        const completed = await ctx.db
            .query("todos")
            .filter((q) => q.eq(q.field("status"), "Completed"))
            .collect();
        for (const todo of completed) {
            await ctx.db.delete(todo._id);
        }
    },
});
