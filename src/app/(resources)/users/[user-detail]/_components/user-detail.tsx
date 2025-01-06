"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import UserPersonalAssets from "./user-personal-assets";
import UserPersonalInformation from "./user-personal-information";
import UserPersonalStock from "./user-personal-stocks";

const UserDetailPage = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-10 py-5">
			<h1 className="flex items-center gap-5 text-2xl font-bold">
				<ChevronLeft
					onClick={() => router.back()}
					className="size-7 hover:cursor-pointer"
				/>{" "}
				Nguyễn Văn A
			</h1>
			<div className="flex gap-10 px-5">
				<UserPersonalInformation />
				<UserPersonalAssets />
			</div>
			<UserPersonalStock />
		</div>
	);
};

export default UserDetailPage;
