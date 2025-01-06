import { z } from "zod";

import { TimeObjectSchema } from "../date/date.schema";

export const FilterCompanyPoliciesSchema = z
	.object({
		name: z.string().optional(),
		startWorkTime: z.union([TimeObjectSchema, z.string()]).optional(),
		endWorkTime: z.union([TimeObjectSchema, z.string()]).optional(),
		startBreakLunchTime: z.union([TimeObjectSchema, z.string()]).optional(),
		endBreakLunchTime: z.union([TimeObjectSchema, z.string()]).optional(),
		startBonusBreakTime: z.union([z.string(), z.number()]).optional(),
		endBonusBreakTime: z.union([z.string(), z.number()]).optional(),
		startRemoteWorkHours: z.union([z.string(), z.number()]).optional(),
		endRemoteWorkHours: z.union([z.string(), z.number()]).optional(),
		startYearlyLeaveDays: z.union([z.string(), z.number()]).optional(),
		endYearlyLeaveDays: z.union([z.string(), z.number()]).optional(),
	})
	.refine(
		(data) => {
			// Check nếu có startWorkTime thì phải có endWorkTime và ngược lại
			if (
				(data.startWorkTime && !data.endWorkTime) ||
				(!data.startWorkTime && data.endWorkTime)
			) {
				return false;
			}

			// Check nếu giờ sau bé hơn giờ trước
			if (data.startWorkTime && data.endWorkTime) {
				const startTime =
					typeof data.startWorkTime === "string"
						? new Date(`1970-01-01T${data.startWorkTime}`)
						: new Date(
								1970,
								0,
								1,
								data.startWorkTime.hour,
								data.startWorkTime.minute,
							);
				const endTime =
					typeof data.endWorkTime === "string"
						? new Date(`1970-01-01T${data.endWorkTime}`)
						: new Date(
								1970,
								0,
								1,
								data.endWorkTime.hour,
								data.endWorkTime.minute,
							);

				// Nếu endTime nhỏ hơn startTime thì return false
				if (endTime < startTime) {
					return false;
				}
			}

			return true;
		},
		{
			message: "End work time must be greater than or equal to start work time",
			path: ["endWorkTime"],
		},
	)
	.refine(
		(data) => {
			if (
				(data.startBreakLunchTime && !data.endBreakLunchTime) ||
				(!data.startBreakLunchTime && data.endBreakLunchTime)
			) {
				return false;
			}

			// Check nếu giờ sau bé hơn giờ trước
			if (data.startBreakLunchTime && data.endBreakLunchTime) {
				const startTime =
					typeof data.startBreakLunchTime === "string"
						? new Date(`1970-01-01T${data.startBreakLunchTime}`)
						: new Date(
								1970,
								0,
								1,
								data.startBreakLunchTime.hour,
								data.startBreakLunchTime.minute,
							);
				const endTime =
					typeof data.endBreakLunchTime === "string"
						? new Date(`1970-01-01T${data.endBreakLunchTime}`)
						: new Date(
								1970,
								0,
								1,
								data.endBreakLunchTime.hour,
								data.endBreakLunchTime.minute,
							);

				// Nếu endTime nhỏ hơn startTime thì return false
				if (endTime < startTime) {
					return false;
				}
			}

			return true;
		},
		{
			message:
				"End break lunch time must be greater than or equal to start break lunch time",
			path: ["endBreakLunchTime"],
		},
	)
	.refine(
		(data) => {
			if (
				(data.startBonusBreakTime && !data.endBonusBreakTime) ||
				(!data.startBonusBreakTime && data.endBonusBreakTime)
			) {
				return false;
			}
			if (data.startBonusBreakTime && data.endBonusBreakTime) {
				return (
					Number(data.endBonusBreakTime) >= Number(data.startBonusBreakTime)
				);
			}
			return true;
		},
		{
			message:
				"End bonus break time must be greater than or equal to start bonus break time",
			path: ["endBonusBreakTime"],
		},
	)
	.refine(
		(data) => {
			if (
				(data.startRemoteWorkHours && !data.endRemoteWorkHours) ||
				(!data.startRemoteWorkHours && data.endRemoteWorkHours)
			) {
				return false;
			}
			if (data.startRemoteWorkHours && data.endRemoteWorkHours) {
				return (
					Number(data.endRemoteWorkHours) >= Number(data.startRemoteWorkHours)
				);
			}
			return true;
		},
		{
			message:
				"End remote work hours must be greater than or equal to start remote work hours",
			path: ["endRemoteWorkHours"],
		},
	)
	.refine(
		(data) => {
			if (
				(data.startYearlyLeaveDays && !data.endYearlyLeaveDays) ||
				(!data.startYearlyLeaveDays && data.endYearlyLeaveDays)
			) {
				return false;
			}
			if (data.startYearlyLeaveDays && data.endYearlyLeaveDays) {
				return (
					Number(data.endYearlyLeaveDays) >= Number(data.startYearlyLeaveDays)
				);
			}
			return true;
		},
		{
			message:
				"End monthly leave days must be greater than or equal to start monthly leave days",
			path: ["endYearlyLeaveDays"],
		},
	);
