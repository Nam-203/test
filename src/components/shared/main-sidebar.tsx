"use client";

import type React from "react";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "~/config/providers/auth.provider";
import { menuItems } from "~/shared/constants/sidebar-items";
import { type SidebarSection } from "~/shared/types";

import SelectLanguage from "./select-language";

const UserProfile: React.FC = () => {
	const { userInfo } = useAuth();

	const userAvatar = userInfo?.avatar ? (
		<Avatar
			src={String(userInfo.avatar)}
			alt={`avatar-${userInfo.fullName || "unknown"}`}
			size="lg"
		/>
	) : (
		<Avatar
			src=""
			name={userInfo?.fullName ? userInfo.fullName.charAt(0) : "?"}
			alt={`avatar-${userInfo?.fullName || "unknown"}`}
			size="lg"
			className="bg-transparent text-3xl font-bold text-primary"
		/>
	);

	return (
		<div className="mb-8 flex items-center gap-[14px] px-[10px] py-2">
			<div className="flex flex-col">
				<span className="box-border flex h-10 w-10 items-center justify-center overflow-hidden rounded-full outline-none ring-2 ring-default ring-offset-2 ring-offset-background">
					{userAvatar}
				</span>
			</div>
			<div>
				<div className="text-base font-semibold text-secondary">
					{userInfo?.fullName || "Unknown User"}
				</div>
				<div className="text-sm font-semibold text-tertiary">
					{userInfo?.email || "No Email"}
				</div>
			</div>
		</div>
	);
};

const MainSidebar: React.FC = () => {
	const pathname = usePathname();

	const renderSidebarItem = (item: {
		link: string;
		name: string;
		icon: React.ElementType;
	}) => {
		const isActive = pathname === item.link;
		const itemClassName = clsx(
			"flex items-center gap-[10px] p-2 hover:cursor-pointer hover:rounded-[4px] hover:bg-transparent-light",
			{ "rounded-[4px] bg-transparent-light": isActive },
		);

		return (
			<Link key={item.link} href={item.link} passHref>
				<div className={itemClassName}>
					<item.icon className="text-xl text-secondary" />
					<div className="text-sm font-medium text-secondary">{item.name}</div>
				</div>
			</Link>
		);
	};

	const renderSidebarSection = (section: SidebarSection, index: number) => {
		return (
			<div key={index} className="flex flex-col gap-[2px]">
				{section.category && (
					<div className="py-[5.5px] pl-1 text-xs font-semibold text-light">
						{section.category}
					</div>
				)}
				{section.items.map(renderSidebarItem)}
			</div>
		);
	};

	return (
		<div className="flex h-full w-full flex-col px-2 pt-2">
			<UserProfile />
			<div className="flex flex-col gap-8">
				{menuItems.map(renderSidebarSection)}
			</div>
			<div className="mt-auto border-t border-t-gray-30 py-8">
				<SelectLanguage />
			</div>
		</div>
	);
};

export default MainSidebar;
