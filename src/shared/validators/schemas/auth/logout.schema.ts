import z from "zod";

export const LogoutSchema = z.object({
	force: z.boolean().optional(),
});
export type TLogoutReq = z.infer<typeof LogoutSchema>;
