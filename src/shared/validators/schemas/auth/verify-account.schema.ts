import z from "zod";

import { AuthBaseSchema } from "~/shared/validators/schemas/auth/auth-base.schema";

export const VerifyAccountSchema = AuthBaseSchema.pick({
	newPassword: true,
	confirmPassword: true,
})
	.extend({
		token: z.string(),
	})
	.refine((values) => values.newPassword === values.confirmPassword, {
		message: "auth.passwordIncorrect",
		path: ["confirmPassword"],
	});

export type TVerifyAccountReq = z.infer<typeof VerifyAccountSchema>;
