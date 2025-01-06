import { z } from "zod";

import { ResourceBaseSchema } from "../resource/resource.schema";

export const RoleBaseSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Role name can't be empty"),
	textColor: z.string(),
	bgColor: z.string(),
	resources: z.array(ResourceBaseSchema),
});

export const RolesBaseSchema = z.array(RoleBaseSchema);

export const CreateRoleSchema = RoleBaseSchema.omit({
	id: true,
	resources: true,
});

export const EditRoleSchema = RoleBaseSchema.omit({ resources: true });

export type TCreateRoleReq = z.infer<typeof CreateRoleSchema>;

export type TEditRoleReq = z.infer<typeof EditRoleSchema>;

export type TRoleRes = z.infer<typeof RoleBaseSchema>;
