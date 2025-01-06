import Image from "next/image";

const page = () => {
	return (
		<div className="h-screen overflow-y-auto bg-[#011d33] p-4 pt-[85px]">
			<div className="rounded-lg bg-white p-4 shadow-sm">
				<div className="mb-4">
					<h1 className="mb-2 text-xl font-bold">
						BẢN TIN TRƯA NGÀY 30.12.2024
					</h1>
					<p className="text-sm text-gray-500">12:00</p>
				</div>
				<div className="mb-4">
					<Image
						src="/image.png"
						alt="Image"
						width={400}
						height={400}
						className="w-full rounded-lg object-contain"
					/>
				</div>

				<div className="space-y-2">
					<p className="text-gray-700">
						Cập nhật thông tin thị trường chứng khoán trong phiên giao dịch trưa
						ngày 30/12/2024
					</p>
					<p className="text-sm italic text-gray-600">
						Chi tiết về diễn biến thị trường và các mã cổ phiếu nổi bật
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
