"use client";

import { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

import CustomInput from "~/components/shared/custom-input";
import type { ICreateRoleModalProps, Role } from "~/shared/types";

const CreateRoleModal = ({
	isOpen,
	onClose,
	onAddRole,
}: ICreateRoleModalProps) => {
	const [roleName, setRoleName] = useState("");

	const handleAddRole = () => {
		const newRole: Role = {
			role: roleName || "New Role",
			userCount: 5,
			permissions: [],
		};
		const savedRoles: Role[] = JSON.parse(
			localStorage.getItem("roles") || "[]",
		) as Role[];
		savedRoles.push(newRole);
		localStorage.setItem("roles", JSON.stringify(savedRoles));

		onAddRole(newRole);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} radius="lg" size="sm">
			<ModalContent>
				<ModalHeader className="text-center text-xl font-bold">
					Create Role
				</ModalHeader>
				<ModalBody>
					<div className="flex flex-col gap-4">
						<CustomInput
							label="roleName"
							placeholder="Enter role name"
							value={roleName}
							onChange={(e) => setRoleName(e.target.value)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="light"
						onPress={onClose}
						className="w-full py-2 text-sm"
					>
						Cancel
					</Button>
					<Button
						color="primary"
						className="w-full py-2 text-sm"
						onPress={handleAddRole}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateRoleModal;
