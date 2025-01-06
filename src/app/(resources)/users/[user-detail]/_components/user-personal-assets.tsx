"use client";

import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserPersonalAssets = () => {
	const data = {
		labels: ["Số dư tiền mặt", "Số tiền chờ bán về", "Tổng số tiền"],
		datasets: [
			{
				label: "Tài sản người dùng",
				data: [2000, 4000, 6000],
				backgroundColor: [
					"rgba(255, 99, 132)",
					"rgba(54, 162, 235)",
					"rgba(255, 206, 86)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="w-1/2 rounded-lg p-5 shadow-2xl">
			<h2 className="font-bold">Thông tin chi tiết tài sản người dùng</h2>
			<div className="flex items-center justify-around">
				<div className="flex flex-col gap-2">
					<p>
						Số dư tiền mặt: <span className="font-bold">2000 USD</span>
					</p>
					<p>
						Số tiền chờ bán về: <span className="font-bold">4000 USD</span>
					</p>
					<p>
						Tổng số tiền: <span className="font-bold">6000 USD</span>
					</p>
				</div>

				<div>
					<Pie data={data} />
				</div>
			</div>
		</div>
	);
};

export default UserPersonalAssets;
