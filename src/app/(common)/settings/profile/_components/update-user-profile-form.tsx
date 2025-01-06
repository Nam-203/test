"use client";

import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { userApiRequest } from "~/api-requests";
import ChangePasswordModal from "~/app/(common)/settings/profile/_components/change-password-modal";
import CustomChip, {
	type TCustomChipColor,
} from "~/components/shared/custom-chip";
import CustomInput from "~/components/shared/custom-input";
import CustomSelect from "~/components/shared/custom-select";
import customToast from "~/components/shared/custom-toast";
import reactI18n from "~/config/i18n/react-i18n";
import { useAuth } from "~/config/providers/auth.provider";
import { AVATAR_MAX_SIZE } from "~/shared/constants/common";
import { EGender } from "~/shared/enums";
import {
	convertEnumToObject,
	handleApiEntityError,
	isValidImageSrc,
} from "~/shared/utils";
import {
	type TUpdateUserProfileReq,
	UpdateUserProfileSchema,
} from "~/shared/validators";

const UpdateUserProfileForm = () => {
	const { setUserInfo } = useAuth();
	const [isShowModalChangePassword, setIsShowModalChangePassword] =
		useState(false);
	const [imageSrc, setImageSrc] = useState<string>("");
	const [imageReq, setImageReq] = useState<File | null>(null);
	const { t } = useTranslation(["common", "auth", "users"], {
		i18n: reactI18n,
	});
	const router = useRouter();

	const enumOptions = convertEnumToObject(EGender);

	const genderOptions = useMemo(() => {
		return enumOptions.map((option) => ({
			...option,
			value: t(`users:gender.${String(option.value)}`),
		}));
	}, [enumOptions, t]);

	// const { data: userDataResponse, isLoading } = useQuery({
	//   queryKey: ['userProfileData'],
	//   queryFn: () => userApiRequest.getMe(),
	//   select: (data) => data.data.data
	// })

	const userDataResponse = useMemo(
		() => ({
			email: "admin@gmail.com",
			fullName: "John Doe",
			phone: "0123456789",
			gender: EGender.male,
			address: "123 Main Street",
			country: "Country",
			city: "City",
			district: "District",
			avatar: "",
		}),
		[],
	);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isDirty },
	} = useForm<TUpdateUserProfileReq>({
		defaultValues: {
			...userDataResponse,
			avatar: imageSrc,
		},
		resolver: zodResolver(UpdateUserProfileSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: userApiRequest.updateProfile,
		onSuccess: async ({ data }) => {
			customToast.success({
				title: t("common:message.success"),
				content: data.message,
			});
			const queryClient = new QueryClient();
			await queryClient.invalidateQueries({ queryKey: ["userProfileData"] });
			if (data.data) {
				setUserInfo(data.data);
			}
		},
		onError: (error) => handleApiEntityError({ error, setError }),
	});

	useEffect(() => {
		reset({
			...userDataResponse,
			gender: String(userDataResponse.gender),
			avatar: userDataResponse.avatar || "",
		});
	}, [userDataResponse, reset]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > AVATAR_MAX_SIZE) {
				customToast.error({
					title: "Upload avatar failed",
					content: "File size exceeds 2MB",
				});
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					setImageSrc(reader.result);
					setImageReq(file);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveAvatar = async () => {
		setImageSrc("");
		setImageReq(null);
		// const file = await convertUrlToFile(avatarDefault.src, 'default-avatar.png', 'image/png')
		// setImageReq(file)
	};

	useEffect(() => {
		if (userDataResponse.avatar) {
			setImageSrc(userDataResponse.avatar);
		} else {
			setImageSrc("");
		}
	}, [userDataResponse]);

	const onSubmit: SubmitHandler<TUpdateUserProfileReq> = (data) => {
		const formData = {
			...data,
			gender: Number(data.gender),
			avatar: imageReq || "",
		};
		mutate(formData);
	};

	const renderInformation = (
		label: string,
		value: React.ReactNode,
		isChip = false,
		chipColor?: TCustomChipColor,
	) => (
		<div className="flex items-center gap-3">
			<div className="w-20 text-sm font-normal text-tertiary"> {label}</div>
			{isChip ? (
				<CustomChip color={chipColor ?? "sky"} size="sm">
					{value}
				</CustomChip>
			) : (
				<div className="flex-1 text-sm font-normal text-primary">{value}</div>
			)}
		</div>
	);

	return (
		<div className="flex h-full flex-col items-center">
			<div className="flex w-[90%] flex-col gap-8">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
					<div className="flex gap-5 text-lg font-semibold text-tertiary">
						<ChevronLeft
							onClick={() => {
								router.back();
							}}
							className="size-7 hover:cursor-pointer"
						/>{" "}
						{t("common:navigation.profile")}
					</div>

					{/* PICTURE */}
					<div className="flex flex-col gap-4">
						<div className="text-sm font-semibold text-primary">
							{t("common:label.picture")}
						</div>
						<div className="flex gap-4">
							<div className="flex !size-[72px] items-center justify-center overflow-hidden rounded-lg bg-tertiary shadow-md">
								<input
									type="file"
									id="upload-avatar"
									name="upload-avatar"
									accept=".jpg, .jpeg, .png"
									hidden
									onChange={handleFileChange}
								/>
								<label
									htmlFor="upload-avatar"
									className="max-h-[72px] max-w-[72px] cursor-pointer"
								>
									{isValidImageSrc(imageSrc) ? (
										<Image
											priority
											src={imageSrc}
											alt="Avatar"
											width={72}
											height={72}
											className="rounded-lg object-cover"
										/>
									) : (
										<span className="text-3xl font-bold text-primary">
											{userDataResponse.fullName.charAt(0)}
										</span>
									)}
								</label>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex gap-2">
									<div>
										<input
											type="file"
											id="upload-avatar-2"
											name="upload-avatar-2"
											accept=".jpg, .jpeg, .png"
											hidden
											onChange={handleFileChange}
										/>
										<label
											htmlFor="upload-avatar-2"
											className="min-w-30 flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-color-medium p-2 text-xs font-medium text-secondary hover:bg-gray-20"
										>
											<Image
												src="/assets/icons/upload.svg"
												alt="upload"
												width={16}
												height={16}
											/>
											{t("common:buttons.upload")}
										</label>
									</div>
									<Button
										variant="light"
										startContent={
											<Image
												src="/assets/icons/trash.svg"
												alt="trash"
												width={16}
												height={16}
											/>
										}
										className="h-max rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
										onClick={handleRemoveAvatar}
									>
										{t("common:buttons.remove")}
									</Button>
								</div>
								<span className="text-xs font-normal text-light">
									{t("common:description.uploadPicture")}
								</span>
							</div>
						</div>
					</div>

					<div className="flex max-w-[400px] flex-col gap-4">
						<div className="text-sm font-semibold text-primary">
							{t("common:label.information")}
						</div>
						<div className="flex flex-col gap-4">
							{renderInformation(
								t("users:fields.email"),
								userDataResponse.email,
							)}
							<div className="flex items-center">
								<div className="w-20 text-sm font-normal text-tertiary">
									{t("users:fields.fullName")}
								</div>
								<div className="w-[90%] flex-1">
									<CustomInput
										type="text"
										register={register("fullName")}
										defaultValue={userDataResponse.fullName}
										validationErrorMessage={errors.fullName?.message}
										size="sm"
										classNames={{ base: "flex-1" }}
									/>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-20 text-sm font-normal text-tertiary">
									{t("users:fields.phone")}
								</div>
								<div className="w-[90%] flex-1">
									<CustomInput
										type="tel"
										register={register("phone")}
										validationErrorMessage={errors.phone?.message}
										size="sm"
										classNames={{ base: "flex-1" }}
									/>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-20 text-sm font-normal text-tertiary">
									{t("users:fields.address")}
								</div>
								<div className="w-[90%] flex-1">
									<CustomInput
										type="text"
										register={register("address")}
										validationErrorMessage={errors.address?.message}
										size="sm"
										classNames={{ base: "flex-1" }}
									/>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-20 text-sm font-normal text-tertiary">
									{t("users:fields.gender")}
								</div>
								<div className="w-[90%] flex-1">
									<CustomSelect
										aria-label="gender"
										options={genderOptions}
										register={register("gender")}
									/>
								</div>
							</div>
						</div>
					</div>

					<Button
						type="submit"
						variant="light"
						className="h-max w-max rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
						isLoading={isPending}
						isDisabled={isPending || (!isDirty && !imageReq)}
					>
						{t("common:buttons.updateProfile")}
					</Button>
				</form>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<div className="text-sm font-semibold text-primary">
							{t("auth:changePassword.title")}
						</div>
						<span className="text-xs font-normal text-tertiary">
							{t("common:description:changePassword")}
						</span>
					</div>
					<Button
						type="button"
						variant="light"
						className="h-max w-max rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
						onClick={() => setIsShowModalChangePassword(true)}
					>
						{t("auth:changePassword:btnChangePassword")}
					</Button>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<div className="text-sm font-semibold text-primary">Logout</div>
					</div>
					<Button
						type="button"
						variant="light"
						className="h-max w-max rounded-md border border-color-medium py-2 text-xs font-medium text-secondary"
					>
						Logout
					</Button>
				</div>
			</div>
			{isShowModalChangePassword && (
				<ChangePasswordModal
					isOpen={isShowModalChangePassword}
					onClose={() => setIsShowModalChangePassword(false)}
				/>
			)}
		</div>
	);
};

export default UpdateUserProfileForm;
