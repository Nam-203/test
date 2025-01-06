"use client";

import { FaRegCircleUser } from "react-icons/fa6";
import { MdChecklistRtl, MdWindow } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { MenuItem } from "~/shared/types/typeProps";

export const MenuComponent = () => {
	const pathname = usePathname();

	const menuItems: MenuItem[] = [
		{
			id: "trading",
			label: "Thị trường",
			path: "/",
			icon: <TbListSearch className="h-5 w-5" />,
		},
		{
			id: "balance",
			label: "Sổ lệnh",
			path: "/balance",
			icon: <MdChecklistRtl className="h-5 w-5" />,
		},
		{
			id: "profile",
			label: "Danh mục",
			path: "/category",
			icon: <FaRegCircleUser className="h-5 w-5" />,
		},
		{
			id: "menu",
			label: "Menu",
			path: "/menu",
			icon: <MdWindow className="h-5 w-5" />,
		},
	];

	return (
		<section>
			<div className="fixed bottom-0 h-[70px] w-full bg-[#215931] text-gray-400 md:hidden">
				<div className="flex h-full items-center justify-around py-2">
					{menuItems.map((item) => (
						<Link
							key={item.id}
							href={item.path}
							className={`flex flex-col items-center ${pathname === item.path ? "text-white" : "text-[#6d7d8a]"}`}
						>
							<span>{item.icon}</span>
							<span className="text-center text-xs">{item.label}</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};
