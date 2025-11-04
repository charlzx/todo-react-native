"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    todos: (0, server_1.defineTable)({
        text: values_1.v.string(),
        description: values_1.v.optional(values_1.v.string()),
        dueDate: values_1.v.optional(values_1.v.string()),
        status: values_1.v.string(), // "onProgress" | "Completed"
        order: values_1.v.number(),
        createdAt: values_1.v.number(),
    }).index("by_order", ["order"]),
});
