import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TTimeEntriesResourceParams } from "~/shared/types/params.type";
import { type TApiResponse } from "~/shared/validators";
import {
	type CheckInTimeEntryReqSchema,
	type CheckOutTimeEntryReqSchema,
	type TCheckInTimeEntryReq,
	type TCheckOutTimeEntryReq,
	type TExportExcelTimeEntriesReq,
	type TimeEntriesSchema,
	type TimeEntrySchema,
} from "~/shared/validators/schemas/time-entry/time-entry.schema";

const timeEntryApiRequest = {
	getTimeEntryToday: async () =>
		axiosHttp.get<TApiResponse<typeof TimeEntrySchema>>(
			API_URL.TIME_ENTRY.GET_TIME_ENTRY_TODAY,
		),

	checkInTimeEntry: async ({ checkInTime }: TCheckInTimeEntryReq) =>
		axiosHttp.post<TApiResponse<typeof CheckInTimeEntryReqSchema>>(
			API_URL.TIME_ENTRY.CHECK_IN_TIME_ENTRY,
			{
				checkInTime,
			},
		),
	checkOutTimeEntry: async ({ checkOutTime }: TCheckOutTimeEntryReq) =>
		axiosHttp.post<TApiResponse<typeof CheckOutTimeEntryReqSchema>>(
			API_URL.TIME_ENTRY.CHECK_OUT_TIME_ENTRY,
			{
				checkOutTime,
			},
		),

	getTimeOwnEntries: async (params?: TTimeEntriesResourceParams) => {
		const defaultParams = { ...params };
		defaultParams.limit ??= "99";

		return axiosHttp.get<TApiResponse<typeof TimeEntriesSchema>>(
			API_URL.TIME_ENTRY.GET_OWN_TIME_ENTRIES,
			{
				params: defaultParams,
			},
		);
	},

	getTimeAllEntries: async (params?: TTimeEntriesResourceParams) => {
		const defaultParams = { ...params };
		defaultParams.limit ??= "99";

		return axiosHttp.get<TApiResponse<typeof TimeEntriesSchema>>(
			API_URL.TIME_ENTRY.GET_ALL_TIME_ENTRIES,
			{
				params: defaultParams,
			},
		);
	},
	exportExcel: async (payload: TExportExcelTimeEntriesReq) => {
		return axiosHttp.post<Blob>(API_URL.TIME_ENTRY.EXPORT_EXCEL, payload, {
			responseType: "arraybuffer",
		});
	},
};

export default timeEntryApiRequest;
