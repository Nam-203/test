import { useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

import { type NotificationCardProps } from "~/shared/types/typeProps";

const NotificationCard = ({ isVisible, onClose }: NotificationCardProps) => {
	const [notifications] = useState([
		{
			id: 1,
			title: "BẢN TIN TRƯA NGÀY ",
			date: "12/12/2024",
			time: "12:00",
			content: "BẢN TIN TRƯA NGÀY 30.12.2024",
			description:
				"Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa ngày 30/12/2024",
			image: "/image.png",
		},
		{
			id: 2,
			title: "BẢN TIN TRƯA NGÀY ",
			date: "12/12/2024",
			time: "12:00",
			content: "BẢN TIN TRƯA NGÀY 30.12.2024",
			description:
				"Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa ngày 30/12/2024",
			image: "/image.png",
		},
		{
			id: 3,
			title: "BẢN TIN TRƯA NGÀY ",
			date: "12/12/2024",
			time: "12:00",
			content: "BẢN TIN TRƯA NGÀY 30.12.2024",
			description:
				"Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa ngày 30/12/2024",
			image: "/image.png",
		},
		{
			id: 4,
			title: "BẢN TIN TRƯA NGÀY ",
			date: "12/12/2024",
			time: "12:00",
			content: "BẢN TIN TRƯA NGÀY 30.12.2024",
			description:
				"Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa ngày 30/12/2024",
			image: "/image.png",
		},
	]);

	return (
		<>
			<section
				className={`fixed right-0 top-0 z-[96] h-screen transform bg-white shadow-xl transition-all duration-300 ease-in-out
          ${isVisible ? "visible translate-x-0 opacity-100 md:w-1/3" : "invisible translate-x-full opacity-0 md:w-1/3"}`}
			>
				<div className="flex items-center justify-between border-b bg-custom-gradient p-4">
					<h2 className="text-lg font-semibold text-white">Thông báo</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 duration-300 hover:bg-green-800 hover:transition-all"
					>
						<MdClose className="h-5 w-5 text-white" />
					</button>
				</div>

				<div className="h-[calc(100vh-80px)] space-y-4 overflow-y-auto p-4 scrollbar-hide">
					{notifications.map((item) => (
						<div key={item.id} className=" rounded-lg border bg-[#ededed] p-4">
							<div className="mb-2 flex items-center justify-between">
								<h3 className="font-medium">
									{item.title} {item.date}
								</h3>
								{item.time && (
									<div className="text-sm text-gray-500">{item.time}</div>
								)}
							</div>
							{item.image ? (
								<div className=" mb-2 flex w-full items-center justify-center ">
									<Image
										src={item.image}
										alt={item.title}
										width={250}
										height={110}
										className=" rounded-lg object-cover"
									/>
								</div>
							) : (
								<p className="mb-2 text-sm text-gray-500">{item.content}</p>
							)}
							<p className="text-sm italic text-gray-600">{item.description}</p>
						</div>
					))}
				</div>
			</section>

			<button
				type="button"
				onClick={onClose}
				className={`fixed inset-0 z-[95] bg-black transition-opacity duration-300
          ${isVisible ? "visible opacity-50" : "invisible opacity-0"}`}
			/>
		</>
	);
};

export default NotificationCard;
