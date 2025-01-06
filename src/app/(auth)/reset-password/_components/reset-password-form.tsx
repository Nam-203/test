"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApiRequest } from "~/api-requests";
import CustomInput from "~/components/shared/custom-input";
import CustomLoadingSpinner from "~/components/shared/custom-loading-spinner";
import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES } from "~/config/routes";
import { ETokenType } from "~/shared/enums/token.enum";
import { type IAuthTokenPayload } from "~/shared/types";
import { handleApiEntityError } from "~/shared/utils";
import {
	ResetPasswordSchema,
	type TResetPasswordReq,
} from "~/shared/validators";

const ResetPasswordForm = () => {
	const router = useRouter();
	const { t } = useTranslation("auth", { i18n: reactI18n });
	const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>();

	const { isLoading: isLoadingToken } = useQuery({
		queryFn: () => authApiRequest.verifyToken(resetPasswordToken),
		queryKey: ["verifyToken", resetPasswordToken],
		enabled: !!resetPasswordToken,
		retry: false,
	});

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<TResetPasswordReq>({
		mode: "onSubmit",
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
			token: resetPasswordToken,
		},
		resolver: zodResolver(ResetPasswordSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ newPassword }: { newPassword: string }) => {
			const decodedToken = jwtDecode<IAuthTokenPayload>(resetPasswordToken);

			if (decodedToken.tokenType === ETokenType.RESET_PASSWORD) {
				return authApiRequest.resetPassword({
					newPassword,
					token: resetPasswordToken,
				});
			}
			return authApiRequest.verifyAccount({
				newPassword,
				token: resetPasswordToken,
			});
		},
		onSuccess: () => {
			toast.success(t("auth:resetPassword.successMessage"));
			router.replace(APP_ROUTES.AUTH.LOGIN);
		},
		onError: (error) => {
			handleApiEntityError({ error, setError });
		},
	});

	const onSubmit = (data: TResetPasswordReq) => {
		mutate({ newPassword: data.newPassword });
	};

	return isLoadingToken ? (
		<CustomLoadingSpinner />
	) : (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex w-[90%] max-w-[500px] flex-col justify-center rounded-lg bg-white p-8 text-center shadow-s-light-b-strong">
				<div className="mb-4 flex justify-center">
					<Image
						src="/assets/images/auth-logo.png"
						alt="reset-password-logo"
						width={250}
						height={250}
					/>
				</div>
				<div className="mb-8 text-xl font-semibold text-primary">
					{t("auth:resetPassword.title")}
				</div>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-3">
						<CustomInput
							type="password"
							label={t("auth:resetPassword.newPassword")}
							placeholder={t("auth:resetPassword.placeholderNewPassword")}
							classNames={{ label: "text-primary" }}
							register={register("newPassword")}
							validationErrorMessage={errors.newPassword?.message}
							isRequired
						/>
						<CustomInput
							type="password"
							label={t("auth:resetPassword.confirmPassword")}
							placeholder={t("auth:resetPassword.placeholderConfirmPassword")}
							classNames={{ label: "text-primary" }}
							register={register("confirmPassword")}
							validationErrorMessage={errors.confirmPassword?.message}
							isRequired
						/>
					</div>
					<Button
						className="mt-4 w-full rounded-lg bg-custom-gradient text-xs font-semibold text-white shadow-s-light-b-strong"
						type="submit"
						isLoading={isPending}
						isDisabled={isPending}
					>
						{t("auth:resetPassword.btnResetPassword")}
					</Button>
				</form>
				<div className="mt-8 flex items-center justify-center gap-2">
					<div className="text-xs text-tertiary decoration-gray-35">
						{t("auth:resetPassword.linkDesc")}
						<Link
							href={APP_ROUTES.AUTH.LOGIN}
							className="ml-1 font-bold underline"
						>
							{t("auth:resetPassword.linkToLogin")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordForm;
