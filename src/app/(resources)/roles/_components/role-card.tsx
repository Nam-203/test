"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

import type { RoleCardProps } from "~/shared/types";

import EditRoleModal from "./edit-role-modal";
import RolePermissionModal from "./permission-checkbox";

const RoleCard: React.FC<RoleCardProps> = ({ role, onDelete }) => {
	const [permissions, setPermissions] = useState<string[]>([]);
	const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		const savedPermissions = localStorage.getItem(`permissions_${role}`);
		if (savedPermissions) {
			try {
				setPermissions(JSON.parse(savedPermissions) as string[]);
			} catch (error) {
				console.error("Error parsing permissions:", error);
			}
		}
	}, [role]);

	useEffect(() => {
		localStorage.setItem(`permissions_${role}`, JSON.stringify(permissions));
	}, [permissions, role]);
	const handleOpenPermissionModal = () => {
		setIsPermissionModalOpen(true);
		setIsMenuOpen(false);
	};

	const handleClosePermissionModal = () => {
		setIsPermissionModalOpen(false);
	};

	const handleSavePermissions = (updatedPermissions: string[]) => {
		setPermissions(updatedPermissions);
		setIsPermissionModalOpen(false);
	};

	const handleOpenEditModal = () => {
		setIsEditModalOpen(true);
		setIsMenuOpen(false);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<div className="relative cursor-pointer rounded-md border bg-white p-4 shadow-md hover:shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-bold">{role}</h3>
				<div className="relative">
					<CiMenuKebab
						className="cursor-pointer text-xl"
						onClick={toggleMenu}
					/>
					{isMenuOpen && (
						<div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg">
							<button
								type="button"
								className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-40"
								onClick={handleOpenEditModal}
							>
								Chỉnh sửa
							</button>
							<button
								type="button"
								className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-40"
								onClick={() => onDelete(role)}
							>
								Xóa
							</button>
						</div>
					)}
				</div>
			</div>
			<p className="mb-4 tracking-wide">Quyền: {permissions.join(", ")}</p>
			<button
				type="button"
				className="mt-2 rounded-md border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:bg-blue-100"
				onClick={handleOpenPermissionModal}
			>
				Phân quyền
			</button>
			{isPermissionModalOpen && (
				<RolePermissionModal
					roleName={role}
					permissions={permissions}
					onSave={handleSavePermissions}
					onClose={handleClosePermissionModal}
				/>
			)}
			{isEditModalOpen && (
				<EditRoleModal
					roleName={role}
					onSave={() => setIsEditModalOpen(false)}
					onClose={handleCloseEditModal}
				/>
			)}
		</div>
	);
};

export default RoleCard;
