import { z } from "zod";

export const AuthBaseSchema = z.object({
	username: z
		.string()
		.min(1, { message: "auth.usernameMinimumRequire" })
		.max(40, { message: "auth.usernameMaxRequire" })
		.trim(),
	email: z
		.string()
		.email("auth.emailInvalid")
		.min(1, { message: "auth.emailMinimumRequire" })
		.max(40, { message: "auth.emailMaxRequire" })
		.trim(),
	phone: z
		.string()
		.regex(/^[0-9]+$/, { message: "auth.phoneInvalid" })
		.length(10, { message: "auth.phoneRequire" })
		.trim(),
	password: z
		.string()
		.min(6, { message: "auth.passwordMinimumRequire" })
		.max(40, { message: "auth.passwordMaxRequire" })
		.refine(
			(value) => {
				const specialChars = /[^A-Za-z0-9]/;
				return specialChars.test(value);
			},
			{ message: "auth.passwordMustContain" },
		)
		.refine((value) => value.trim() === value, {
			message: "auth.passwordCannotContain",
		}),
	oldPassword: z.string().min(6, { message: "auth.passwordMinimumRequire" }),
	newPassword: z
		.string()
		.min(6, { message: "auth.passwordMinimumRequire" })
		.max(40, { message: "auth.passwordMaxRequire" })
		.refine(
			(value) => {
				const specialChars = /[^A-Za-z0-9]/;
				return specialChars.test(value);
			},
			{ message: "auth.passwordMustContain" },
		)
		.refine((value) => value.trim() === value, {
			message: "auth.passwordCannotContain",
		}),
	confirmPassword: z
		.string()
		.min(6, { message: "auth.passwordMinimumRequire" })
		.max(40, { message: "auth.passwordMaxRequire" })
		.refine(
			(value) => {
				const specialChars = /[^A-Za-z0-9]/;
				return specialChars.test(value);
			},
			{ message: "auth.passwordMustContain" },
		)
		.refine((value) => value.trim() === value, {
			message: "auth.passwordCannotContain",
		}),
});
