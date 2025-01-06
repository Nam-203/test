import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TPermissionsReq } from "~/shared/validators/schemas/permission/permission.schema";

const permissionApiRequest = {
	updatePermission: async ({ roleId, permissionIds }: TPermissionsReq) =>
		axiosHttp.patch(API_URL.PERMISSION.UPDATE_PERMISSION, {
			roleId,
			permissionIds,
		}),
};

export default permissionApiRequest;
