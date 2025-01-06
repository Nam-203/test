"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const UserPersonalInformation = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowLevel2Password, setIsShowLevel2Password] = useState(false);

	return (
		<div className="w-1/2 rounded-lg p-5 shadow-2xl">
			<h2 className="font-bold">Thông tin chi tiết về người dùng</h2>
			<div className="mt-10 grid grid-cols-2 gap-x-2 gap-y-5">
				<p>
					Họ và tên: <span className="font-bold">Nguyễn Văn A</span>
				</p>
				<p>
					Email:{" "}
					<span className="font-bold underline">nguyenvana@gmail.com</span>
				</p>
				<p className="flex items-center gap-2">
					Mật khẩu:{" "}
					<span className="font-bold">
						{isShowPassword ? "password" : "********"}
					</span>
					<button
						type="button"
						onClick={() => setIsShowPassword(!isShowPassword)}
						className="flex items-center"
					>
						{isShowPassword ? (
							<EyeOff className="h-5 w-5" />
						) : (
							<Eye className="h-5 w-5" />
						)}
					</button>
				</p>

				<p>
					Vai trò: <span className="font-bold">Admin</span>
				</p>

				<p>
					Ghi chú: <span className="font-bold">Khách hàng tiềm năng</span>
				</p>

				<p>
					Ngày tạo: <span className="font-bold">25/12/2024</span>
				</p>

				<p>
					SĐT: <span className="font-bold">0967173505</span>
				</p>

				<p className="flex items-center gap-2">
					Mật khẩu C2:{" "}
					<span className="font-bold">
						{isShowLevel2Password ? "password" : "********"}
					</span>
					<button
						type="button"
						onClick={() => setIsShowLevel2Password(!isShowLevel2Password)}
						className="flex items-center"
					>
						{isShowLevel2Password ? (
							<EyeOff className="h-5 w-5" />
						) : (
							<Eye className="h-5 w-5" />
						)}
					</button>
				</p>

				<p>
					Mã cổ đông: <span className="font-bold">ACB134234</span>{" "}
				</p>

				<p>
					Người giới thiệu: <span className="font-bold">Nguyễn Văn B</span>
				</p>
			</div>
		</div>
	);
};

export default UserPersonalInformation;
