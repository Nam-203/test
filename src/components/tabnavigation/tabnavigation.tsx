"use client";

import { useState } from "react";

import MarketUpdateCard from "../marketCard/marketCard";

export default function TabNavigation() {
	const [activeTab, setActiveTab] = useState("Tất cả");

	const tabs = [
		{
			label: "Tất cả",
			content: (
				<MarketUpdateCard
					date="12/12/2024"
					time="12:00"
					content="BẢN TIN TRƯA NGÀY 30.12.2024"
					description="Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa ngày 30/12/2024"
					image="/image.png"
				/>
			),
		},
		{
			label: "Giao dịch",
			content: (
				<MarketUpdateCard
					date="12/12/2024"
					time="09:30"
					content="Thông tin giao dịch sáng ngày 30/12/2024"
					description="Chi tiết các giao dịch nổi bật và khối lượng giao dịch trong phiên sáng"
					image="/image.png"
				/>
			),
		},
		{
			label: "Cảnh báo",
			content: (
				<MarketUpdateCard
					date="12/12/2024"
					time="10:15"
					content="Cảnh báo biến động mạnh cổ phiếu ABC"
					description="Cổ phiếu ABC có dấu hiệu biến động bất thường, nhà đầu tư cần thận trọng"
					image="/image.png"
				/>
			),
		},
		{
			label: "Khuyến nghị",
			content: (
				<MarketUpdateCard
					date="12/12/2024"
					time="11:00"
					content="Khuyến nghị đầu tư cổ phiếu XYZ"
					description="Phân tích và đánh giá tiềm năng tăng trưởng của cổ phiếu XYZ"
					image="/image.png"
				/>
			),
		},
		{
			label: "Thị trường",
			content: (
				<MarketUpdateCard
					date="12/12/2024"
					time="13:30"
					content="Tổng quan thị trường chứng khoán"
					description="Đánh giá tổng thể diễn biến thị trường và các yếu tố tác động chính"
					image="/image.png"
				/>
			),
		},
	];

	const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;

	return (
		<div className="mt-[80px] md:hidden">
			<div className="flex overflow-x-auto border-b border-gray-700 bg-[#001B3A] text-gray-400">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.label}
						className={`whitespace-nowrap px-4 py-3 text-sm ${activeTab === tab.label ? "text-white" : ""}`}
						onClick={() => setActiveTab(tab.label)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="min-h-screen overflow-y-auto bg-[#011d33] px-4 py-4">
				<div className="pb-20">{activeContent}</div>
			</div>
		</div>
	);
}
