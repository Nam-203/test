"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { authApiRequest } from "~/api-requests";
import CustomInput from "~/components/shared/custom-input";
import customToast from "~/components/shared/custom-toast";
import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES } from "~/config/routes";
import { handleApiEntityError } from "~/shared/utils";
import {
	ForgotPasswordReqSchema,
	type TForgotPasswordReq,
} from "~/shared/validators";

const BackToLoginLink = ({ t }: { t: (key: string) => string }) => (
	<div className="mt-8 flex items-center justify-center gap-2">
		<Image
			src="/assets/icons/chevron-left.svg"
			alt="chevron-left"
			width={8}
			height={8}
		/>
		<Link
			href={APP_ROUTES.AUTH.LOGIN}
			className="text-xs text-tertiary underline decoration-gray-35"
		>
			{t("auth:forgotPassword.btnBackToLogin")}
		</Link>
	</div>
);
const ForgotPasswordForm = () => {
	const { t } = useTranslation(["common", "auth", "users"], {
		i18n: reactI18n,
	});

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<TForgotPasswordReq>({
		mode: "onSubmit",
		defaultValues: { email: "" },
		resolver: zodResolver(ForgotPasswordReqSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (email: string) => authApiRequest.forgotPassword({ email }),
		onSuccess: (data) => {
			customToast.success({
				title: t("common:message.success"),
				content: data.data.message || data.statusText,
			});
		},
		onError: (error) => {
			handleApiEntityError({ error, setError });
		},
	});

	const onSubmit = handleSubmit((data: TForgotPasswordReq) =>
		mutate(data.email),
	);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="flex w-[90%] max-w-[500px] flex-col justify-center rounded-lg bg-white p-8 text-center shadow-s-light-b-strong">
				<div className="mb-4 flex justify-center">
					<Image
						src="/assets/images/auth-logo.webp"
						alt="forgot-password-logo"
						width={250}
						height={250}
						priority
					/>
				</div>
				<div className="mb-8 text-xl font-semibold text-primary">
					{t("auth:forgotPassword.title")}
				</div>
				<form className="flex flex-col" onSubmit={onSubmit}>
					<div className="flex flex-col gap-3">
						<CustomInput
							type="email"
							label={t("users:fields.email")}
							isRequired
							placeholder={t("Email")}
							register={register("email")}
							validationErrorMessage={errors.email?.message}
							classNames={{ label: "text-primary" }}
						/>
					</div>
					<Button
						disabled={isPending}
						className="mt-4 w-full rounded-lg bg-custom-gradient text-xs font-semibold text-white shadow-s-light-b-strong"
						type="submit"
						isLoading={isPending}
					>
						{t("send email")}
					</Button>
				</form>
				<BackToLoginLink t={t} />
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
