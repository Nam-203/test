"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

import { type TModalProps } from "~/shared/types";

interface IConfirmModalProps extends TModalProps {
	onConfirm?: () => void;
	isLoading?: boolean;
	isDisabled?: boolean;
	modalHeader: React.ReactNode;
	modalBody: React.ReactNode;
	confirmButtonText: string;
	cancelButtonText: string;
}
const ConfirmModal: React.FC<IConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading,
	isDisabled,
	modalHeader,
	modalBody,
	confirmButtonText,
	cancelButtonText,
}) => {
	return (
		<Modal size="xs" isOpen={isOpen} onClose={onClose} radius="sm">
			<ModalContent>
				{(handleClose) => (
					<>
						<ModalHeader className="flex justify-center text-center text-base font-semibold text-primary">
							{modalHeader}
						</ModalHeader>
						<ModalBody className="text-center">
							<div className="text-xs font-normal text-primary">
								{modalBody}
							</div>
						</ModalBody>
						<ModalFooter className="flex flex-col">
							<Button
								variant="light"
								className="rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
								onPress={handleClose}
							>
								{cancelButtonText}
							</Button>
							<Button
								variant="light"
								className="rounded-md border border-red-20 py-2 text-xs font-medium text-danger"
								onPress={onConfirm}
								isDisabled={isDisabled}
								isLoading={isLoading}
							>
								{confirmButtonText}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ConfirmModal;
