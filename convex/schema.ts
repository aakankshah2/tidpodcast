import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    source: v.string(), // "homepage" | "footer" — useful when you add more forms
    userAgent: v.optional(v.string()),
  }).index("by_email", ["email"]),
});
