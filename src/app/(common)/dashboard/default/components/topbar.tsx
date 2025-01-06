"use client";

import { IoMdNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const TopBar = () => {
	const router = useRouter();

	const handleNavigation = (path: string) => {
		router.push(path);
	};

	return (
		<header className="flex items-center justify-between bg-transparent-light px-6 py-4 shadow-md">
			<div className="relative w-1/3">
				<input
					type="text"
					placeholder="Tìm kiếm"
					className="w-full rounded-lg border border-gray-30 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div className="ml-auto flex items-center space-x-3">
				<Button
					onPress={() => handleNavigation("/notifications")}
					aria-label="Notifications"
					size="sm"
					className="border-none"
				>
					<IoMdNotifications
						className="text-green-60"
						style={{ fontSize: 24 }}
					/>
				</Button>
				<Button
					onPress={() => handleNavigation("/settings")}
					aria-label="Settings"
					size="sm"
					className="border-none"
				>
					<IoSettingsSharp className="text-green-60" style={{ fontSize: 24 }} />
				</Button>
				<Button
					onPress={() => handleNavigation("/profile")}
					aria-label="Profile"
					size="sm"
					className="border-none"
				>
					<MdAccountCircle className="text-green-60" style={{ fontSize: 24 }} />
				</Button>
			</div>
			<Button
				type="button"
				onPress={() => handleNavigation("/add-user")}
				className="ml-4 rounded-lg bg-green-50 p-2 font-bold text-white"
				size="sm"
			>
				+ Thêm người dùng
			</Button>
		</header>
	);
};

export default TopBar;
