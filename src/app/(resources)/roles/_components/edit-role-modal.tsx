"use client";

import type React from "react";
import { useState } from "react";

import type { EditRoleModalProps } from "~/shared/types";

const EditRoleModal: React.FC<EditRoleModalProps> = ({
	roleName,
	onSave,
	onClose,
}) => {
	const [newRoleName, setNewRoleName] = useState(String(roleName));
	const handleSave = () => {
		onSave?.(newRoleName);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-xl font-bold">Chỉnh Sửa Vai Trò</h2>
				<div className="mb-4">
					<label
						htmlFor="roleNameInput"
						className="block text-sm font-medium text-gray-700"
					>
						Tên Vai Trò
						<input
							id="roleNameInput"
							type="text"
							value={newRoleName}
							onChange={(e) => setNewRoleName(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</label>
				</div>
				<div className="flex justify-end gap-4">
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

export default EditRoleModal;
