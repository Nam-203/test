import type React from "react";
import CloseIcon from "@icons/close.svg";
import { cn } from "@nextui-org/react";
import Image from "next/image";
import { type ExternalToast, toast, type ToastT } from "sonner";

type TToastType = "success" | "info" | "warning" | "error";
type TPosition =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-center"
	| "bottom-center";

interface ToastConfig {
	iconSrc: string;
	className: string;
}

interface CustomToastProps extends Omit<ExternalToast, "id" | "type"> {
	title: string;
	content: React.ReactNode;
	type?: TToastType;
	width?: string | number;
}

const TOAST_CONFIG: Record<TToastType, ToastConfig> = {
	success: {
		iconSrc: "/assets/icons/success.svg",
		className: "hover:bg-turquoise-10",
	},
	info: {
		iconSrc: "/assets/icons/info.svg",
		className: "hover:bg-blue-10",
	},
	error: {
		iconSrc: "/assets/icons/error.svg",
		className: "hover:bg-red-10",
	},
	warning: {
		iconSrc: "/assets/icons/warning.svg",
		className: "hover:bg-orange-10",
	},
};

const DEFAULT_POSITION: TPosition = "bottom-right";

const ToastContainer: React.FC<CustomToastProps & { id: ToastT["id"] }> = ({
	id,
	className,
	title,
	icon,
	content,
	type,
	width,
}) => {
	const typeConfig = type ? TOAST_CONFIG[type] : null;

	return (
		<div
			style={{ width }}
			className={cn(
				"relative flex flex-col justify-center gap-2 rounded-lg bg-white p-3 shadow-s-strong-b-strong transition-all duration-500 ease-in-out",
				typeConfig?.className,
				className,
			)}
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-2">
					{icon ||
						(typeConfig && (
							<Image
								src={typeConfig.iconSrc}
								alt={`icon-${type ?? "default"}`}
								width={20}
								height={20}
							/>
						))}
					<h2 className="text-sm font-medium text-primary">{title}</h2>
				</div>
				<button type="button" onClick={() => toast.dismiss(id)}>
					<CloseIcon width={12} height={12} className="hover:stroke-gray-90" />
				</button>
			</div>
			<div className="flex flex-col">
				<p className="w-10/12 text-sm text-tertiary">{content}</p>
			</div>
		</div>
	);
};

const customToast = ({
	title,
	content,
	type,
	width,
	...props
}: CustomToastProps): string | number => {
	return toast.custom(
		(id) => (
			<ToastContainer
				id={id}
				title={title}
				content={content}
				type={type}
				width={width}
				{...props}
			/>
		),
		{
			...props,
			position: DEFAULT_POSITION,
		},
	);
};

const createToastVariant =
	(type: TToastType) =>
	(props: Omit<CustomToastProps, "type">): string | number =>
		customToast({ ...props, type });

customToast.success = createToastVariant("success");
customToast.info = createToastVariant("info");
customToast.error = createToastVariant("error");
customToast.warning = createToastVariant("warning");

export default customToast;
