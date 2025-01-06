import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TApiResponse } from "~/shared/validators";
import {
	type EmploymentHistoriesSchema,
	type EmploymentHistorySchema,
	type TUpdateEmploymentHistories,
	type UpdateEmploymentHistoriesSchema,
} from "~/shared/validators/schemas/employment-histories/employment-histories.schema";

const employmentHistoriesApiRequest = {
	getOwnEmploymentHistories: (params?: { page?: string; limit?: string }) =>
		axiosHttp.get<TApiResponse<typeof EmploymentHistorySchema>>(
			API_URL.EMPLOYMENT_HISTORIES.GET_OWN_EMPLOYMENT_HISTORIES,
			{ params },
		),
	getAllEmploymentHistories: async (params?: {
		page?: string;
		limit?: string;
	}) => {
		return axiosHttp.get<TApiResponse<typeof EmploymentHistoriesSchema>>(
			API_URL.EMPLOYMENT_HISTORIES.GET_ALL_EMPLOYMENT_HISTORIES,
			{ params },
		);
	},

	updateEmploymentHistory: async (
		userId: string,
		data: TUpdateEmploymentHistories,
	) => {
		return axiosHttp.patch<
			TApiResponse<typeof UpdateEmploymentHistoriesSchema>
		>(
			API_URL.EMPLOYMENT_HISTORIES.UPDATE_EMPLOYMENT_HISTORY.replace(
				":id",
				userId,
			),
			data,
		);
	},
};

export default employmentHistoriesApiRequest;
