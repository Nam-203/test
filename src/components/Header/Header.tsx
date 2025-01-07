"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
	MdLanguage,
	MdLogout,
	MdNotifications,
	MdOutlineEdit,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import NotificationCard from "../notificationCard/notificationCard";

export function Header() {
	const pathname = usePathname();
	const params = useParams();
	const [search, setSearch] = useState("");
	const [isSearch, setIsSearch] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [notificationDetail, setNotificationDetail] = useState<string | null>(
		null,
	);

	const menuItems = useMemo(
		() => [
			{ id: "trading", label: "Thị trường", path: "/" },
			{ id: "balance", label: "Sổ lệnh", path: "/balance" },
			{ id: "profile", label: "Danh mục", path: "/category" },
		],
		[],
	);
	const getPageLabel = useCallback(() => {
		const currentItem = menuItems.find((item) => item.path === pathname);
		return currentItem ? currentItem.label : "Trang khác";
	}, [pathname, menuItems]);
	const router = useRouter();
	const isNotificationPage = pathname.startsWith("/notification");

	useEffect(() => {
		if (params.id) {
			setNotificationDetail(`Thông báo ngày ${params.id as string}`);
		} else {
			setNotificationDetail(null);
		}
	}, [params]);

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	const renderMobileHeader = () => {
		if (pathname === "/menu") {
			return (
				<header className="fixed left-0 top-0 z-30 flex h-[80px] w-full items-center justify-between  bg-custom-gradient px-3 pt-2 md:hidden">
					<div className="flex items-center ">
						<div className="flex items-center justify-center rounded-full opacity-75 ">
							<Image
								src="/avt.png"
								alt="avatar user"
								className=""
								width={75}
								height={75}
							/>
						</div>
						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<span className="font-medium text-white ">NGUYỄN VĂN A</span>
								<MdOutlineEdit className="h-4 w-4 text-white" />
							</div>
							<span className="text-[10px] text-white">ID: 0946177642</span>
						</div>
					</div>
					<MdLogout className="h-6 w-6 text-white" />
				</header>
			);
		}

		if (isNotificationPage) {
			return (
				<header className="fixed left-0 top-0 z-30 flex h-[80px] w-full items-center bg-custom-gradient px-4 py-4 text-white md:hidden">
					<button
						type="button"
						className="mr-6 text-sm font-bold"
						onClick={handleBack}
					>
						<FaArrowLeftLong className="h-4 w-4" />
					</button>
					<h1 className="text-base font-bold">
						{notificationDetail || "Thông Báo"}
					</h1>
				</header>
			);
		}

		return (
			<header className="fixed left-0 top-0 z-30 flex h-[100px] w-full items-center justify-between gap-2 border-b-[25px] border-gray-300 bg-custom-gradient p-4 md:hidden">
				<div className="flex items-center">
					<p className="text-sm font-bold capitalize text-white">
						{pathname === "/" ? "Thị trường" : getPageLabel()}
					</p>
				</div>
				{isSearch ? (
					<div className="flex origin-left scale-x-100 transform items-center overflow-hidden rounded-[5px] border border-white bg-[#70747900] px-2 py-1 transition-transform duration-300">
						<FaSearch className="h-[15px] w-[19px] pl-1 text-white" />
						<input
							type="text"
							name="search"
							placeholder="Tìm mã chứng khoán"
							className="ml-2 w-full max-w-full bg-transparent text-sm text-gray-300 focus:outline-none"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				) : null}
				<div className="flex items-center gap-2">
					<FaSearch
						className="h-[15px] w-[19px] cursor-pointer pl-1 text-white"
						onClick={() => setIsSearch(!isSearch)}
					/>
					<MdLanguage className="h-5 w-5 cursor-pointer text-base text-white" />
					<MdNotifications
						className="h-6 w-5 cursor-pointer text-base text-white"
						onClick={() => router.push("/notification")}
					/>
				</div>
			</header>
		);
	};

	return (
		<section className="z-50">
			{renderMobileHeader()}
			<header className="fixed left-0 top-0 z-30 hidden h-[90px] w-full items-center justify-between gap-2 bg-custom-gradient px-4 md:flex">
				<div className="flex items-center space-x-2">
					<Image
						src="/logo.png"
						alt="logo"
						className="h-10 w-10"
						width={40}
						height={40}
					/>
					<Link
						href="/"
						className="cursor-pointer text-lg font-bold text-white"
					>
						FinTech
					</Link>
				</div>
				<div className="flex w-[50%] items-center rounded-[5px] border border-white bg-[#70747900] px-4 py-2 text-white transition-all duration-300 md:w-1/3 lg:w-[45%] xl:w-1/2">
					<FaSearch className="h-5 w-5 text-white" />
					<input
						type="text"
						name="search"
						placeholder="Tìm mã chứng khoán"
						className="ml-3 w-full bg-transparent text-sm text-white focus:outline-none"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex min-w-[200px] items-center justify-center gap-5 text-center">
					{menuItems.map((item) => (
						<div key={item.id}>
							<Link
								href={item.path}
								className="font-bold text-white underline decoration-white underline-offset-8"
							>
								<span className="mt-1 text-[8px] uppercase decoration-white md:text-[10px] lg:text-[12px] xl:text-sm">
									{item.label}
								</span>
							</Link>
						</div>
					))}
				</div>
				<div className="flex items-center justify-end gap-2 px-3">
					<MdLanguage className="h-5 w-5 cursor-pointer pl-1 text-white" />
					<MdNotifications
						className="h-6 w-5 cursor-pointer text-base text-white"
						onClick={() => setIsVisible(!isVisible)}
					/>
					<div className="flex items-center justify-center rounded-full opacity-75 ">
						<Image
							src="/avt.png"
							alt="avatar user"
							className=""
							width={50}
							height={50}
						/>
					</div>
				</div>
			</header>

			{isVisible && (
				<NotificationCard
					isVisible={isVisible}
					onClose={() => setIsVisible(false)}
				/>
			)}
		</section>
	);
}
