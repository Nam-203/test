import { z } from "zod";

import reactI18n from "~/config/i18n/react-i18n";
import { ETimeEntryStatus, EUserRequestStatus } from "~/shared/enums";

export const TimeEntryBaseSchema = z.object({
	id: z.string(),
	checkInTime: z.string().nullable(),
	checkOutTime: z.string().nullable(),
	checkDate: z.string().nullable(),
	status: z.nativeEnum(ETimeEntryStatus),
	bonusBreakTime: z.number(),
	totalRequestHours: z.number(),
	attendanceHours: z.number(),
	breakLunchHours: z.number(),
	workHoursPerDay: z.number(),
	userRequestSegments: z.array(
		z.object({
			id: z.string(),
			startTime: z.string(),
			endTime: z.string(),
			reason: z.string(),
			status: z.nativeEnum(EUserRequestStatus),
			approverName: z.string(),
			approverId: z.string(),
			approverEmail: z.string(),
			requestHours: z.number(),
		}),
	),
	user: z.object({
		id: z.string(),
		fullName: z.string(),
	}),
});

export const TimeEntrySchema = TimeEntryBaseSchema;

export const TimeEntriesSchema = z.array(TimeEntryBaseSchema);

export const CheckInTimeEntryReqSchema = TimeEntryBaseSchema.pick({
	checkInTime: true,
});

export const CheckOutTimeEntryReqSchema = TimeEntryBaseSchema.pick({
	checkOutTime: true,
});

export const exportExcelTimeEntriesSchema = z.object({
	userIds: z
		.array(z.string())
		.nonempty({
			message: reactI18n.t("validations:form.required"),
		})
		.transform((val) => val.map(String)),
	companyIds: z
		.array(z.string())
		.nonempty({
			message: reactI18n.t("validations:form.required"),
		})
		.transform((val) => val.map(Number)),
	startTime: z
		.string({
			message: reactI18n.t("validations:form.required"),
		})
		.min(1),
	endTime: z
		.string({
			message: reactI18n.t("validations:form.required"),
		})
		.min(1),
});

export type TExportExcelTimeEntriesReq = z.TypeOf<
	typeof exportExcelTimeEntriesSchema
>;

export type TCheckInTimeEntryReq = z.TypeOf<typeof CheckInTimeEntryReqSchema>;
export type TCheckOutTimeEntryReq = z.TypeOf<typeof CheckOutTimeEntryReqSchema>;
export type TTimeEntryRes = z.TypeOf<typeof TimeEntryBaseSchema>;
