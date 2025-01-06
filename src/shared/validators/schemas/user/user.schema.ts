import { z } from "zod";

import { EGender, EUserStatus } from "~/shared/enums";
import { isClient } from "~/shared/utils";

import { RoleBaseSchema } from "../role/role.schema";

export const UserBaseSchema = z.object({
	id: z.string(),
	email: z.string().email("Invalid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
	fullName: z.string().min(1, "Full name is required."),
	avatar: isClient()
		? z.union([z.string(), z.instanceof(File)]).optional()
		: z.string().optional(),
	gender: z.union([z.string(), z.nativeEnum(EGender)]),
	phone: z.string().min(1, "Phone number is required."),
	address: z.string().min(1, "Address is required."),
	district: z.string().min(1, "District is required."),
	city: z.string().min(1, "City is required."),
	country: z.string().min(1, "Country is required."),
	position: z.string().min(1, "Position is required."),
	companyId: z.union([z.string(), z.number()]),
	status: z.union([z.string(), z.nativeEnum(EUserStatus)]),
	roleId: z.union([z.string(), z.number()]),
	role: RoleBaseSchema,
	joinDate: z.union([
		z.date(),
		z.string(),
		z.object({ day: z.number(), month: z.number(), year: z.number() }),
		z.object({}),
	]),
	deletedAt: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const UserManagementBaseSchema = UserBaseSchema.extend({
	role: RoleBaseSchema.pick({
		id: true,
		name: true,
		textColor: true,
		bgColor: true,
	}),
});

export const UserManagementResSchema = UserManagementBaseSchema.omit({
	roleId: true,
});

export const UsersManagementResSchema = z.array(
	UserManagementBaseSchema.omit({
		roleId: true,
	}),
);

export const UpdateUserProfileSchema = UserBaseSchema.omit({
	id: true,
	email: true,
	password: true,
	status: true,
	roleId: true,
	companyId: true,
	position: true,
	joinDate: true,
	role: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});

export const RegisterUserReqSchema = UserManagementBaseSchema.pick({
	email: true,
	password: true,
	fullName: true,
	phone: true,
	gender: true,
	address: true,
	district: true,
	city: true,
	country: true,
	position: true,
	companyId: true,
	roleId: true,
	status: true,
});

export const UpdateUserReqSchema = UserManagementBaseSchema.omit({
	id: true,
	role: true,
	password: true,
	avatar: true,
	joinDate: true,
	deletedAt: true,
	createdAt: true,
	updatedAt: true,
});

export const approversSchema = z.array(
	UserManagementBaseSchema.pick({
		id: true,
		email: true,
		fullName: true,
	}).extend({
		role: RoleBaseSchema.pick({
			name: true,
		}),
	}),
);
export const requestersSchema = z.array(
	UserManagementBaseSchema.pick({
		id: true,
		email: true,
		fullName: true,
	}).extend({
		role: RoleBaseSchema.pick({
			name: true,
		}),
	}),
);

//* ---------------------------------- REQUEST TYPES ----------------------------------
export type TRegisterUserReq = z.infer<typeof RegisterUserReqSchema>;
export type TUpdateUserReq = z.infer<typeof UpdateUserReqSchema>;

//* ---------------------------------- RESPONSE TYPES ----------------------------------
export type TUserManagementRes = z.infer<typeof UserManagementResSchema>;
export type TUserProfileRes = z.infer<typeof UserBaseSchema>;
export type TUpdateUserProfileReq = z.infer<typeof UpdateUserProfileSchema>;
