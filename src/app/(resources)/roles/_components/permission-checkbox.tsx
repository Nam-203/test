"use client";

import type React from "react";
import { useEffect, useState } from "react";

import type { RolePermissionModalProps } from "~/shared/types";

const RolePermissionModal: React.FC<RolePermissionModalProps> = ({
	roleName,
	permissions,
	onSave,
	onClose,
}) => {
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
	useEffect(() => {
		setSelectedPermissions(permissions);
	}, [permissions]);
	const handleCheckboxChange = (permission: string) => {
		setSelectedPermissions((prev) =>
			prev.includes(permission)
				? prev.filter((item) => item !== permission)
				: [...prev, permission],
		);
	};

	const handleSave = () => {
		onSave(selectedPermissions);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-xl font-bold">Quyền truy cập - {roleName}</h2>
				<div className="grid grid-cols-2 gap-4">
					{["Đọc", "Tạo", "Cập nhật", "Xóa"].map((permission) => (
						<div
							key={permission}
							className={`flex items-center justify-between rounded-md border ${
								selectedPermissions.includes(permission)
									? "border-blue-500"
									: "border-gray-300"
							} p-4`}
						>
							<div>
								<h3 className="font-semibold">{permission}</h3>
								<p className="text-sm text-gray-600">{`Cho phép ${permission.toLowerCase()} vai trò`}</p>
							</div>
							<input
								type="checkbox"
								checked={selectedPermissions.includes(permission)}
								onChange={() => handleCheckboxChange(permission)}
								className="h-5 w-5 accent-blue-500"
							/>
						</div>
					))}
				</div>
				<div className="mt-6 flex justify-end gap-4">
					<button
						type="button"
						className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
						onClick={onClose}
					>
						Hủy
					</button>
					<button
						type="button"
						className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						onClick={handleSave}
					>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default RolePermissionModal;
