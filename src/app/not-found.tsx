"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "~/config/routes";

const NotFoundPage = () => {
	const router = useRouter();

	const handleGoDashboard = () => {
		router.push(APP_ROUTES.COMMON.ROOT);
	};

	return (
		<div className="dark:bg-dark-primary bg-gray-10/80 flex h-screen w-full flex-col items-center justify-center gap-10 p-6">
			<div className="flex flex-col items-center justify-center text-center text-black dark:text-white">
				<Image
					src="/assets/images/404.svg"
					alt="logo"
					className="object-cover"
					width={300}
					height={300}
				/>
				<div className="mb-4 mt-8 text-2xl font-semibold text-primary">
					Off the beaten path
				</div>
				<div className="text-xs font-normal text-secondary">
					The page you&apos;re seeking is either gone or never was. Let&apos;s
					get you back on track.
				</div>

				<Button
					className="mt-4 w-fit rounded-lg bg-gray-60 text-xs font-semibold text-white shadow-s-light-b-strong"
					type="button"
					onClick={handleGoDashboard}
				>
					Back to Dashboard
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
