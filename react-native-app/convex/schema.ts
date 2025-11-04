import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    status: v.string(), // "onProgress" | "Completed"
    order: v.number(),
    createdAt: v.number(),
  }).index("by_order", ["order"]),
});
