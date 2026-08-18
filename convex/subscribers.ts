import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Public mutation called by the newsletter form on tidpodcast.in.
export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.string(),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const trimmed = args.email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      return { ok: false, reason: "invalid_email" as const };
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", trimmed))
      .first();

    if (existing) {
      return { ok: true, alreadySubscribed: true };
    }

    await ctx.db.insert("subscribers", {
      email: trimmed,
      source: args.source,
      userAgent: args.userAgent,
    });

    return { ok: true, alreadySubscribed: false };
  },
});

// Internal helper for you — query all subscribers from the Convex dashboard.
// You can also browse the table directly in Convex's data viewer.
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").order("desc").collect();
  },
});
