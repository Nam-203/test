import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TUserResourceParams } from "~/shared/types/params.type";
import {
	type approversSchema,
	type requestersSchema,
	type TApiResponse,
	type TUpdateUserProfileReq,
	type TUpdateUserReq,
	type UpdateUserReqSchema,
	type UserBaseSchema,
	type UsersManagementResSchema,
} from "~/shared/validators";

const userApiRequest = {
	getMe: async (accessToken?: string) =>
		axiosHttp.get<TApiResponse<typeof UserBaseSchema>>(
			API_URL.USER.GET_PROFILE,
			{
				headers: {
					Authorization: `Bearer ${accessToken ?? ""}`,
				},
			},
		),

	getUsers: async (params?: TUserResourceParams) => {
		const defaultParams = { ...params };
		defaultParams.limit ??= "99";

		return axiosHttp.get<TApiResponse<typeof UsersManagementResSchema>>(
			API_URL.USER.GET_ALL,
			{ params: defaultParams },
		);
	},

	getUserById: async (id: string) =>
		axiosHttp.get<TApiResponse<typeof UserBaseSchema>>(
			API_URL.USER.GET_BY_ID.replace(":id", id),
		),

	getApprovers: async () =>
		axiosHttp.get<TApiResponse<typeof approversSchema>>(
			API_URL.USER.GET_APPROVERS,
		),

	getRequesters: async () =>
		axiosHttp.get<TApiResponse<typeof requestersSchema>>(
			API_URL.USER.GET_REQUESTERS,
		),

	updateUser: async (
		id: string,
		data: Omit<TUpdateUserReq, "password , avatar">,
	) => {
		return axiosHttp.patch<TApiResponse<typeof UpdateUserReqSchema>>(
			API_URL.USER.UPDATE.replace(":id", id),
			data,
		);
	},

	updateProfile: async (data: TUpdateUserProfileReq) => {
		return axiosHttp.patch<TApiResponse<typeof UserBaseSchema>>(
			API_URL.USER.UPDATE_PROFILE,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
	},

	deleteUser: async (id: string) =>
		axiosHttp.delete<TApiResponse<typeof UsersManagementResSchema>>(
			API_URL.USER.DELETE.replace(":id", id),
		),

	exportExcel: async (userIds: string[]) => {
		return axiosHttp.post<Blob>(
			API_URL.USER.EXPORT_EXCEL,
			{ userIds },
			{
				responseType: "arraybuffer",
			},
		);
	},
};

export default userApiRequest;
