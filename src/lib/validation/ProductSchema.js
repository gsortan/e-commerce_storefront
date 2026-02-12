import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageURL: z.httpUrl("Must be a valid image URL"),
  price: z.coerce.number().positive("Price must be > 0"),
  stock: z.coerce
    .number({
      error: "Stock is required",
    })
    .int("Stock must be a whole number")
    .min(0, "Stock can't be negative"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["ACTIVE", "DISABLED"]).default("DISABLED"),
});
