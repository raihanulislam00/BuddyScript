import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password required"),
});

export const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  isPrivate: z.boolean().default(false),
  imageBase64: z.string().nullable().optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  parentId: z.string().optional().nullable(),
});
