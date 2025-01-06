"use client";

import { useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { IoSettings, IoStatsChartSharp } from "react-icons/io5";
import { MdOutlineWidgets } from "react-icons/md";
import { Search } from "lucide-react";

export default function TradingApp() {
	const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
	const [isShowSuggest, setIsShowSuggest] = useState(false);

	const toggleGroup = (title: string) => {
		setExpandedGroups((prev) =>
			prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
		);
	};

	const menu = [
		{
			icon: <IoStatsChartSharp className="h-5 w-5 text-icon" />,
			title: "Thị trường",
			items: [],
		},
		{
			icon: <MdOutlineWidgets className="h-5 w-5 text-icon" />,
			title: "Tin tức",
			items: [],
		},
		{
			icon: <FaChartLine className="h-5 w-5 text-icon" />,
			title: "Phân tích",
			items: [],
		},
		{
			icon: <FiBox className="h-5 w-5 text-icon" />,
			title: "Quản lý tài khoản",
			items: ["Tổng hợp tài sản", "Nợ ký quỹ"],
		},
		{
			icon: <MdOutlineWidgets className="h-5 w-5 text-icon" />,
			title: "Tiện ích",
			items: [
				"Chuyển tiền",
				"Chuyển tiền phái sinh",
				"Chuyển chứng khoán",
				"Chuyển lệnh",
				"Đăng ký quyền mua",
				"Phí trả trước",
				"Xác nhận lệnh",
				"Giải phóng lệnh cuối ngày",
				"Tra cứu chứng khoán Margin",
				"Smart OTP [Chưa đăng ký]",
				"Hợp đồng điện tử",
			],
		},
		{
			icon: <CiHeadphones className="h-5 w-5 text-icon" />,
			title: "Hố trợ",
			items: [
				"Thông báo",
				"Liên hệ",
				"Chat với Fintech",
				"Sổ tay",
				"Hưỡng dẫn",
			],
		},
		{
			icon: <IoSettings className="h-5 w-5 text-icon" />,
			title: "Cài đặt",
			items: [
				"Thông báo",
				"Liên hệ",
				"Chat với Fintech",
				"Sổ tay",
				"Hưỡng dẫn",
			],
		},
	];
	return (
		<div className="mt-[80px] h-screen bg-[#011d33]">
			<div className="sticky top-[80px] z-10 w-full bg-[#011d33]">
				<div className="px-4 py-1.5 text-xs text-gray-500">
					Đăng nhập gần nhất: 01/01/2024 09:29:35
				</div>
				<div className="bg-bg-default px-3 py-1">
					<div
						role="button"
						tabIndex={0}
						className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#143045] px-2 py-1"
						onClick={() => setIsShowSuggest(!isShowSuggest)}
						onKeyDown={(e) =>
							e.key === "Enter" && setIsShowSuggest(!isShowSuggest)
						}
					>
						<Search className="h-4 w-4 text-white" />
						<input
							type="text"
							placeholder="Tìm kiếm"
							className="w-full bg-[#143045] text-white outline-none"
						/>
					</div>
					{isShowSuggest ? (
						<div className="ml-2 py-1 pl-5 text-xs text-[#b2bbc2]">
							Lãi/lỗ đã thục hiện
						</div>
					) : null}
				</div>
			</div>

			<div className="flex-1 bg-[#011d33] pb-10">
				<div className="bg-[#011d33]">
					{menu.map((group) => (
						<div key={group.title} className="group">
							<button
								type="button"
								aria-expanded={expandedGroups.includes(group.title)}
								className="flex w-full cursor-pointer items-center gap-[17px] bg-[#143045] px-3 py-1 transition-all duration-200 group-hover:bg-[#1a3b57]"
								onClick={() => toggleGroup(group.title)}
							>
								<span className=" text-lg ">{group.icon}</span>
								<span className="text-white">{group.title}</span>
							</button>
							{expandedGroups.includes(group.title) && (
								<div className="flex flex-col pl-9">
									{group.items.map((label) => (
										<span
											key={label}
											className="inline-block border-b-[0.5px] border-[#143045] px-2 py-2 text-left text-[13px] text-[#b2bbc2] transition-all duration-200 hover:bg-[#1a3b57]"
										>
											{label}
										</span>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
