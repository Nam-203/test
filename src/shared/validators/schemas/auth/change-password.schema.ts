import { type z } from "zod";

import { AuthBaseSchema } from "~/shared/validators/schemas/auth/auth-base.schema";

export const ChangePasswordSchema = AuthBaseSchema.pick({
	oldPassword: true,
	newPassword: true,
	confirmPassword: true,
}).refine((values) => values.newPassword === values.confirmPassword, {
	message: "auth.passwordIncorrect",
	path: ["confirmPassword"],
});

export const ChangePasswordReq = AuthBaseSchema.pick({
	oldPassword: true,
	newPassword: true,
});

export type TChangePasswordReq = z.infer<typeof ChangePasswordReq>;

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
