import { EUserStatus, EGender } from "../enums";

export interface TModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface SidebarItem {
	link: string;
	name: string;
	icon: React.ElementType;
}

export interface SidebarSection {
	category: string;
	items: SidebarItem[];
}

export type AdminRole = "Admin" | "Manager" | "Editor" | "Viewer";

export enum AdminStatus {
	Active = "Active",
	Inactive = "Inactive",
}

export interface Admin {
	id: string;
	name: string;
	password: string;
	status: AdminStatus;
	roles: AdminRole[];
	createdAt: string;
	createdBy: string;
	notes: string;
}

export interface CommonLocale {
	metadata: {
		title: {
			login: string;
			register: string;
			profileSettings: string;
			rolesPermissions: string;
		};
	};
}

export interface TSidebarItem {
	label: string;
	icon: string;
	path: string;
}

export type UserStatus = "Active" | "Inactive";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	passwordC2: string;
	contact: string;
	status: UserStatus;
	roles: string[];
	createdAt: string;
	createdBy: string;
	notes: string;
	referral: string;
	assets: string;
	report: string;
}

export interface LocaleMetadata {
	metadata: {
		title: {
			users: string;
		};
	};
}
export interface RoleCardProps {
	role: string;
	userCount: number;
	onClick: () => void;
	onMenuClick: () => void;
	onDelete: (role: string) => void;
}
export interface Role {
	role: string;
	userCount: number;
	permissions: string[];
}
export interface IRoleMenuModalProps {
	isOpen: boolean;
	onClose: () => void;
	role: string;
	onEdit: () => void;
	onDelete: () => void;
}
export interface EditDeleteRoleModalProps {
	isOpen: boolean;
	onClose: () => void;
	role: string | null;
	onEdit: (role: string) => void;
	onDelete: (role: string) => void;
}
export interface ICreateRoleModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddRole: (newRole: Role) => void;
}
export interface LocaleCommon {
	metadata: {
		title: {
			rolesPermissions: string;
		};
	};
}

export interface Stock {
	id: number;
	stockCode: string;
	referencePrice: number;
	purchaseDate: string;
	purchasePrice: number;
	note: string;
}
export interface RolePermissionModalProps {
	roleName: string;
	permissions: string[];
	onSave: (permissions: string[]) => void;
	onClose: () => void;
}
export interface EditRoleModalProps {
	isOpen?: boolean;
	role?: string;
	roleName?: string;
	onSave?: (newRoleName: string) => void;
	onClose: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export interface DecryptedData {
	id: string;
	email: string;
	password: string;
	fullName: string;
	status: string | EUserStatus;
	gender: string | EGender;
	phone: string;
	address: string;
	district: string;
	city: string;
	country: string;
	postalCode: string;
	avatar?: string;
}
