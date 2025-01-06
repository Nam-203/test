import z from "zod";

import { AuthBaseSchema } from "~/shared/validators/schemas/auth/auth-base.schema";
import { AuthTokenSchema } from "~/shared/validators/schemas/token/token.schema";

export const RegisterSchema = AuthBaseSchema.pick({
	username: true,
	email: true,
	phone: true,
	password: true,
}).extend({});

export type TRegisterReq = z.infer<typeof RegisterSchema>;

export const RegisterRes = z.object({
	tokens: AuthTokenSchema,
});

export type TRegisterRes = z.TypeOf<typeof RegisterRes>;
