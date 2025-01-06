import { type Role } from "~/shared/types/common.type";

export const rolesData: Role[] = [
	{ role: "Admin", userCount: 4, permissions: ["Đọc , Tạo , Cập Nhật. Xóa"] },
	{ role: "Staff", userCount: 2, permissions: ["Đọc , Tạo "] },
	{ role: "User", userCount: 1, permissions: ["Đọc "] },
];
