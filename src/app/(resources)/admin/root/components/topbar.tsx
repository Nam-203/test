"use client";

import { IoMdNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

import CreateUserModal from "./create-user-modal";

const TopBar = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<header className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
			<div className="relative w-1/4">
				<input
					type="text"
					placeholder="Tìm kiếm"
					className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
			<div className="ml-auto flex items-center space-x-5">
				<Link href="/notifications">
					<IoMdNotifications className="cursor-pointer text-icon-size text-icon-default hover:text-icon-hover" />
				</Link>
				<Link href="/settings">
					<IoSettingsSharp className="cursor-pointer text-icon-size text-icon-default hover:text-icon-hover" />
				</Link>
				<Link href="/profile">
					<MdAccountCircle className="cursor-pointer text-icon-size text-icon-default hover:text-icon-hover" />
				</Link>
			</div>
			<Button
				type="button"
				onPress={onOpen}
				className="ml-4 rounded-lg bg-green-600 p-1.5 text-xs font-bold text-white"
				size="sm"
			>
				+ Thêm người dùng
			</Button>
			<CreateUserModal isOpen={isOpen} onOpenChange={onOpenChange} />
		</header>
	);
};

export default TopBar;
