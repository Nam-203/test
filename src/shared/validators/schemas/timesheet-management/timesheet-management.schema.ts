import { z } from "zod";

import { ETimeEntryStatus } from "~/shared/enums";

import { UserBaseSchema } from "../user/user.schema";

export const TimeSheetManagementSchema = z.object({
	id: z.string(),
	checkDate: z.string(),
	checkInTime: z.string(),
	checkOutTime: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	totalWorkHours: z.number(),
	userId: z.string(),
	status: z.nativeEnum(ETimeEntryStatus),
	user: UserBaseSchema,
});

export const TimeSheetManagementRes = z.array(TimeSheetManagementSchema);

export type TTimeSheetManagementRes = z.TypeOf<
	typeof TimeSheetManagementSchema
>;
