import { type TResources } from "~/shared/types/resources.type";

import { type TActionPermissions } from "../validators/schemas/permission/permission.schema";

export const hasPermission = (
	resourceName: TResources,
	action: string,
	permissions?: TActionPermissions[] | null,
) => {
	if (!permissions) return false;
	const permissionToCheck = `${resourceName}.${action}`;
	return permissions.includes(permissionToCheck);
};
