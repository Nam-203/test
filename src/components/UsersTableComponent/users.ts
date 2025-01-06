import { type User, type UserStatus } from "../../shared/types/common.type";

export const fetchUsersData = (): User[] => {
	return [
		{
			id: "1",
			name: "Nguyễn Văn A",
			email: "nguyenvana@example.com",
			password: "********",
			passwordC2: "********",
			contact: "123456789",
			status: "Active" as UserStatus,
			roles: ["Admin", "Manager"],
			createdAt: "2023-01-01T00:00:00Z",
			createdBy: "System",
			notes: "Ghi chú 1",
			referral: "TBA",
			assets: "10.000.000",
			report: "Chưa có báo cáo",
		},
		{
			id: "2",
			name: "Trần Thị B",
			email: "tranthib@example.com",
			password: "********",
			passwordC2: "********",
			contact: "987654321",
			status: "Inactive" as UserStatus,
			roles: ["Editor"],
			createdAt: "2023-02-01T00:00:00Z",
			createdBy: "System",
			notes: "Ghi chú 2",
			referral: "TBA",
			assets: "9.000.000",
			report: "Đang chờ báo cáo",
		},
	];
};
