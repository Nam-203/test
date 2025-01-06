import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import {
	type RoleBaseSchema,
	type RolesBaseSchema,
	type TApiResponse,
	type TCreateRoleReq,
	type TEditRoleReq,
} from "~/shared/validators";

const rolesApiRequest = {
	addRole: async (data: TCreateRoleReq) =>
		axiosHttp.post<TApiResponse>(API_URL.ROLE.ADD_ROLE, data),

	getRoles: async () =>
		axiosHttp.get<TApiResponse<typeof RolesBaseSchema>>(API_URL.ROLE.GET_ROLES),

	deleteRole: async (id: string) =>
		axiosHttp.delete<TApiResponse>(API_URL.ROLE.DELETE_ROLE.replace(":id", id)),

	editRole: async (id: string, data: TEditRoleReq) =>
		axiosHttp.patch<TApiResponse<typeof RoleBaseSchema>>(
			API_URL.ROLE.EDIT_ROLE.replace(":id", String(id)),
			data,
		),

	assignUserToRole: async ({
		roleId,
		userIds,
	}: {
		roleId: string;
		userIds: string[];
	}) =>
		axiosHttp.patch<TApiResponse>(
			API_URL.ROLE.ASSIGN_ROLE.replace(":id", String(roleId)),
			{ userIds },
		),
};

export default rolesApiRequest;
