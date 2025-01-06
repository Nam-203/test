import { z } from "zod";

export const EmploymentHistorySchema = z.object({
	id: z.string(),
	joinDate: z.string().nullable(),
	probationDate: z.string().nullable(),
	officialDate: z.string().nullable(),
	nextLeaveAccumulationDate: z.string().nullable(),
	leaveAccumulationResetDate: z.string().nullable(),
	contractRenewDate: z.string().nullable(),
	totalLeaveDays: z.number().nullable(),
	usedLeaveDays: z.number().nullable(),
	oldUsedLeaveDays: z.number().nullable(),
	oldTotalLeaveDays: z.number().nullable(),
	userInfo: z.object({
		id: z.string(),
		fullName: z.string(),
		role: z.string(),
		position: z.string(),
		company: z.string(),
	}),
});

export const EmploymentHistoriesSchema = z.array(EmploymentHistorySchema);
export type TEmploymentHistoriesRes = z.TypeOf<typeof EmploymentHistorySchema>;
export const UpdateEmploymentHistoriesSchema = EmploymentHistorySchema.omit({
	id: true,
	userInfo: true,
});
export type TUpdateEmploymentHistories = z.TypeOf<
	typeof UpdateEmploymentHistoriesSchema
>;
