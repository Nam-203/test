"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { LucideBell, LucideLayoutGrid, LucidePhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authApiRequest } from "~/api-requests";
import CustomInput from "~/components/shared/custom-input";
import customToast from "~/components/shared/custom-toast";
import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES } from "~/config/routes";
import { handleApiEntityError } from "~/shared/utils";
import {
	RegisterSchema,
	type TRegisterReq,
} from "~/shared/validators/schemas/auth/register.schema";

const RegisterForm = () => {
	const router = useRouter();
	const { t } = useTranslation(["common", "auth", "users"], {
		i18n: reactI18n,
	});

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<TRegisterReq>({
		mode: "onSubmit",
		resolver: zodResolver(RegisterSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (payload: TRegisterReq) =>
			authApiRequest.loginToNextServer(payload),
		onSuccess: (data: { data: { message: string } }) => {
			customToast.success({
				title: t("common:message.success"),
				content: data.data.message,
			});
			router.push(APP_ROUTES.COMMON.ROOT);
			router.refresh();
		},
		onError: (error) => {
			handleApiEntityError({ error, setError });
		},
	});

	const onSubmit = handleSubmit((data: TRegisterReq) => mutate(data));

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="flex w-[90%] max-w-[500px] flex-col justify-center rounded-lg bg-white p-8 text-center shadow-s-light-b-strong">
				<div className="mb-4 flex justify-center">
					<Image
						src="/assets/images/auth-logo.png"
						alt="login-logo"
						width={250}
						height={250}
					/>
				</div>
				<div className="mb-8 text-xl font-semibold text-primary">
					{t("auth:register.title")}
				</div>
				<form className="flex flex-col" onSubmit={onSubmit}>
					<div className="flex flex-col gap-3">
						<CustomInput
							type="text"
							label={t("users:fields.username")}
							isRequired
							placeholder={t("auth:login.username")}
							register={register("username")}
							validationErrorMessage={errors.username?.message}
							classNames={{ label: "text-primary" }}
						/>
						<CustomInput
							type="email"
							label={t("users:fields.email")}
							isRequired
							placeholder={t("auth:register.email")}
							register={register("email")}
							validationErrorMessage={errors.email?.message}
							classNames={{ label: "text-primary" }}
						/>
						<CustomInput
							type="tel"
							label={t("users:fields.phone")}
							isRequired
							placeholder={t("auth:register.phone")}
							register={register("phone")}
							validationErrorMessage={errors.phone?.message}
							classNames={{ label: "text-primary" }}
						/>
						<CustomInput
							type="password"
							label={t("auth:login.password")}
							isRequired
							placeholder={t("auth:register.password")}
							register={register("password")}
							validationErrorMessage={errors.password?.message}
							classNames={{ label: "text-primary" }}
						/>
						{/* <Link href={APP_ROUTES.AUTH.FORGOT_PASSWORD} className='text-xs text-tertiary underline decoration-gray-35'>
              {t('auth:login.forgotPassword')}
            </Link>
            <Link
              href={APP_ROUTES.AUTH.RESEND_VERIFY_ACCOUNT}
              className='text-xs text-tertiary underline decoration-gray-35'
            >
              {t('auth:login.resendVerifyAccount')}
            </Link> */}
					</div>
					<Button
						disabled={isPending}
						className="mt-4 w-full rounded-lg bg-custom-gradient text-xs font-semibold text-white shadow-s-light-b-strong"
						type="submit"
						isLoading={isPending}
					>
						{t("auth:register.btnRegister")}
					</Button>
					<p className="mt-2 text-black">
						{t("auth:register.accountText")}{" "}
						<Link
							href={APP_ROUTES.AUTH.LOGIN}
							className="bg-custom-gradient bg-clip-text font-bold italic text-transparent hover:cursor-pointer"
						>
							{t("auth:login.btnLogin")}
						</Link>
					</p>

					<div className="mx-auto mt-10 flex space-x-5">
						<LucidePhoneCall className="size-6 hover:cursor-pointer" />
						<LucideBell className="size-6 hover:cursor-pointer" />
						<LucideLayoutGrid className="size-6 hover:cursor-pointer" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
