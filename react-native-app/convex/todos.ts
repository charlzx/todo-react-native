import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all todos ordered by their order field
export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("desc").collect();
  },
});

// Create a new todo
export const createTodo = mutation({
  args: {
    text: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the highest order value to add new todos at the beginning
    const todos = await ctx.db.query("todos").order("desc").collect();
    const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order)) : -1;
    
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
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    
    await ctx.db.patch(args.id, {
      status: todo.status === "onProgress" ? "Completed" : "onProgress",
    });
  },
});

// Delete a todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update todo order (for drag and drop)
export const updateTodoOrder = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("todos"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const todo of args.updates) {
      await ctx.db.patch(todo.id, { order: todo.order });
    }
  },
});

// Update a todo's text, description, and dueDate
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
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
export const deleteCompleted = mutation({
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
