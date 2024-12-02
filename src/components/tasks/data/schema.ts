import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  orderId: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  amount: z.string(),
  date: z.string(),
  businessName: z.string(),
  email: z.string().email(), // To validate email format
  mobile: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
