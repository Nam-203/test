"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { rolesData } from "~/components/RolesTableComponent/role";
import CustomBreadcrumbs from "~/components/shared/custom-breadcrumbs";
import CustomButton from "~/components/shared/custom-button";
import { type Role } from "~/shared/types";

import CreateRoleModal from "./create-role-modal";
import RoleMenuModal from "./edit-role-modal";
import RoleCard from "./role-card";

const RolesForm: React.FC = () => {
	const [isShowDialogNewRole, setIsShowDialogNewRole] = useState(false);
	const [roles, setRoles] = useState<Role[]>(rolesData);
	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const [isShowDialogEditRole, setIsShowDialogEditRole] = useState(false);

	const handleCloseModalNewRole = () => {
		setIsShowDialogNewRole(false);
	};

	const handleAddRole = (newRole: Role) => {
		setRoles((prevRoles) => [...prevRoles, newRole]);
		handleCloseModalNewRole();
	};

	const handleEditRole = (role: string) => {
		setSelectedRole(role);
		setIsShowDialogEditRole(true);
	};

	const handleDeleteRole = (role: string) => {
		setRoles((prevRoles) => prevRoles.filter((r) => r.role !== role));
		setIsShowDialogEditRole(false);
	};

	return (
		<div className="min-h-screen p-4">
			<div className="mb-4 flex items-center justify-between">
				<CustomBreadcrumbs
					breadcrumbsItems={[{ children: "Tiêu đề ", href: "/roles" }]}
				/>
				<CustomButton
					color="primary"
					endContent={<PlusIcon className="stroke-white" />}
					className="rounded-md border py-2 text-xs font-medium text-white"
					onPress={() => setIsShowDialogNewRole(true)}
				>
					Thêm vai trò
				</CustomButton>
			</div>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{roles.map((role) => (
					<RoleCard
						key={role.role}
						role={role.role}
						userCount={role.userCount}
						onClick={() => console.log(`Clicked on ${role.role}`)}
						onMenuClick={() => {
							handleEditRole(role.role);
						}}
						onDelete={() => {
							handleDeleteRole(role.role);
						}}
					/>
				))}
			</div>

			{isShowDialogNewRole && (
				<CreateRoleModal
					isOpen={isShowDialogNewRole}
					onClose={handleCloseModalNewRole}
					onAddRole={handleAddRole}
				/>
			)}

			{isShowDialogEditRole && selectedRole && (
				<RoleMenuModal
					isOpen={isShowDialogEditRole}
					onClose={() => setIsShowDialogEditRole(false)}
					role={selectedRole}
					onEdit={() => handleEditRole(selectedRole)}
					onDelete={() => handleDeleteRole(selectedRole)}
				/>
			)}
		</div>
	);
};

export default RolesForm;
