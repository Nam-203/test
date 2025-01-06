import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

import CustomDropdown from "~/components/shared/custom-dropdown";
import { ACTIVE_DATA, ROLE_DATA } from "~/shared/data/data";
import { type CreateUserModalProps } from "~/shared/types/typeProps";

const CreateUserModal = ({ isOpen, onOpenChange }: CreateUserModalProps) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col font-bold">
							Tạo người dùng
						</ModalHeader>
						<ModalBody>
							<div className="grid grid-cols-2 gap-x-5 gap-y-10 ">
								<Input
									label={
										<span className="font-bold text-black">Tên đăng nhập*</span>
									}
									placeholder="Tên đăng nhập"
									type="text"
									className="min-w-xs"
								/>
								<Input
									label={
										<span className="font-bold text-black">Mật khẩu*</span>
									}
									placeholder="Mật khẩu"
									type="password"
								/>
								<Input
									label={<span className="font-bold text-black">Ngày tạo</span>}
									placeholder="Thời gian"
									type="text"
								/>
								<Input
									label={
										<span className="font-bold text-black">Số điện thoại</span>
									}
									placeholder="Số điện thoại"
									type="text"
								/>
								<Input
									label={<span className="font-bold text-black">Email</span>}
									placeholder="Email"
									type="email"
								/>
								<Input
									label={
										<span className="font-bold text-black">
											Người giới thiệu
										</span>
									}
									placeholder="ID người giới thiệu"
									type="text"
								/>
								<Input
									label={
										<span className="font-bold text-black">Mã cổ đông</span>
									}
									placeholder="Mã cổ đông"
									type="text"
								/>
								<Input
									label={<span className="font-bold text-black">Ghi chú</span>}
									placeholder="Ghi chú"
									type="text"
								/>

								<div>
									<h2 className="mb-5 text-lg">Vai trò</h2>
									<CustomDropdown dropData={ROLE_DATA} />
								</div>
								<div>
									<h2 className="mb-5 text-lg">Trạng thái tài khoản</h2>
									<CustomDropdown dropData={ACTIVE_DATA} />
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={onClose}
								className="font-bold"
							>
								Cancel
							</Button>
							<Button
								color="primary"
								onPress={onClose}
								className="bg-custom-gradient font-bold"
								radius="sm"
							>
								Submit
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateUserModal;
