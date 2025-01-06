import z from "zod";

import { AuthBaseSchema } from "~/shared/validators/schemas/auth/auth-base.schema";
import { AuthTokenSchema } from "~/shared/validators/schemas/token/token.schema";

export const LoginSchema = AuthBaseSchema.pick({ username: true }).extend({
	password: z.string().min(1),
});

export type TLoginReq = z.infer<typeof LoginSchema>;

export const LoginRes = z.object({
	tokens: AuthTokenSchema,
});

export type TLoginRes = z.TypeOf<typeof LoginRes>;
