"use client";

import {
	type FieldErrors,
	type SubmitHandler,
	useForm,
	type UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authApiRequest } from "~/api-requests";
import CustomInput from "~/components/shared/custom-input";
import customToast from "~/components/shared/custom-toast";
import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES } from "~/config/routes";
import { type TModalProps } from "~/shared/types";
import { handleApiEntityError } from "~/shared/utils";
import {
	ChangePasswordSchema,
	type TChangePasswordReq,
	type TChangePasswordSchema,
} from "~/shared/validators";

const PasswordInputs: React.FC<{
	register: UseFormRegister<TChangePasswordSchema>;
	errors: FieldErrors<TChangePasswordSchema>;
	t: (key: string) => string;
}> = ({ register, errors, t }) => (
	<>
		<CustomInput
			type="password"
			label={t("auth:changePassword.oldPassword")}
			isRequired
			placeholder={t("auth:changePassword.placeholderOldPassword")}
			register={register("oldPassword")}
			validationErrorMessage={errors.oldPassword?.message}
			classNames={{ label: "text-primary" }}
		/>
		<CustomInput
			type="password"
			label={t("auth:changePassword.newPassword")}
			isRequired
			placeholder={t("auth:changePassword.placeholderNewPassword")}
			register={register("newPassword")}
			validationErrorMessage={errors.newPassword?.message}
			classNames={{ label: "text-primary" }}
		/>
		<CustomInput
			type="password"
			label={t("auth:changePassword.confirmPassword")}
			isRequired
			placeholder={t("auth:changePassword.placeholderConfirmPassword")}
			register={register("confirmPassword")}
			validationErrorMessage={errors.confirmPassword?.message}
			classNames={{ label: "text-primary" }}
		/>
	</>
);

const CancelButton: React.FC<{
	onClose: () => void;
	t: (key: string) => string;
}> = ({ onClose, t }) => (
	<Button
		variant="light"
		className="rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
		onPress={onClose}
	>
		{t("common:buttons.cancel")}
	</Button>
);

const SaveButton: React.FC<{
	isPending: boolean;
	t: (key: string) => string;
}> = ({ isPending, t }) => (
	<Button
		type="submit"
		color="primary"
		className="rounded-md border border-color-medium py-2 text-xs font-medium text-gray-0"
		isDisabled={isPending}
		isLoading={isPending}
	>
		{t("common:buttons.save")}
	</Button>
);

const ChangePasswordModal: React.FC<TModalProps> = ({ isOpen, onClose }) => {
	const { t } = useTranslation(["auth", "common"], { i18n: reactI18n });
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<TChangePasswordSchema>({
		mode: "onSubmit",
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		resolver: zodResolver(ChangePasswordSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: TChangePasswordReq) =>
			authApiRequest.changePassword({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			}),
		onSuccess: async (data) => {
			customToast.success({
				title: t("common:message.success"),
				content: data.data.message,
			});

			await authApiRequest.logoutNextServer(true);
			router.replace(APP_ROUTES.AUTH.LOGIN);
			router.refresh();

			onClose();
		},
		onError: (error) => {
			handleApiEntityError({
				error,
				setError,
			});
		},
	});

	const onSubmit: SubmitHandler<TChangePasswordReq> = (
		data: TChangePasswordReq,
	) => {
		mutate(data);
	};

	return (
		<Modal size="md" isOpen={isOpen} onClose={onClose} radius="sm">
			<ModalContent>
				{(closeModal) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{t("auth:changePassword.title")}
						</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<PasswordInputs register={register} errors={errors} t={t} />
							</ModalBody>
							<ModalFooter>
								<CancelButton onClose={closeModal} t={t} />
								<SaveButton isPending={isPending} t={t} />
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ChangePasswordModal;
