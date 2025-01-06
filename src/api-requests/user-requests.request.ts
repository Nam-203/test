import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import {
	type TApiResponse,
	type TCreateHolidayRequestReq,
	type TCreateUserRequestReq,
	type UserRequestsResSchema,
} from "~/shared/validators";

const userRequestsApiRequest = {
	getAllUserRequests: async (params: Record<string, unknown>) => {
		return axiosHttp.get<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.GET_ALL_REQUESTS,
			{
				params,
			},
		);
	},
	getOwnUserRequests: async (params: Record<string, unknown>) => {
		return axiosHttp.get<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.GET_OWN_REQUESTS,
			{
				params,
			},
		);
	},
	createRequest: async (data: TCreateUserRequestReq) =>
		axiosHttp.post<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.CREATE_REQUEST,
			data,
		),
	createHolidayRequest: async (data: TCreateHolidayRequestReq) =>
		axiosHttp.post<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.CREATE_HOLIDAY_REQUEST,
			data,
		),
	approveRequest: async (ids: string[]) =>
		axiosHttp.patch<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.APPROVE_REQUEST,
			{
				userRequestIds: ids,
			},
		),
	rejectRequest: async (ids: string[]) =>
		axiosHttp.patch<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.REJECT_REQUEST,
			{
				userRequestIds: ids,
			},
		),
	deleteOwnRequests: async (userRequestIds: string[]) =>
		axiosHttp.delete<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.DELETE_OWN_REQUESTS,
			{
				data: { userRequestIds },
			},
		),
	approverDeleteRequests: async (userRequestIds: string[]) =>
		axiosHttp.delete<TApiResponse<typeof UserRequestsResSchema>>(
			API_URL.USER_REQUEST.APPROVER_DELETE_REQUESTS,
			{
				data: { userRequestIds },
			},
		),
};

export default userRequestsApiRequest;
