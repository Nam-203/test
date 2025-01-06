import { type z } from "zod";

import { AuthBaseSchema } from "~/shared/validators/schemas/auth/auth-base.schema";

export const ResendVerifyAccountReqSchema = AuthBaseSchema.pick({
	email: true,
});
export type TResendVerifyAccountReq = z.infer<
	typeof ResendVerifyAccountReqSchema
>;
