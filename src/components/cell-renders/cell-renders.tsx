import { memo, useMemo } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Link from "next/link";

import type { TradingAccount } from "~/shared/types/typeProps";

// Preload essential assets for faster render
const DEFAULT_ICON = "/default-icon.webp";

export const SymbolCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const iconSrc = useMemo(() => data?.icon ?? DEFAULT_ICON, [data?.icon]);
		const bankName = data?.bankName;

		return (
			<div className="flex items-center gap-3">
				{/* Lazy-load hình ảnh với priority nếu cần */}
				<Image
					src={iconSrc}
					alt={String(value ?? "Icon")}
					className="h-8 w-8 rounded-full bg-gray-700"
					width={32}
					height={32}
					loading="lazy" // Tối ưu lazy-loading
					placeholder="blur" // Dùng hiệu ứng blur placeholder
					blurDataURL={iconSrc} // Base64 placeholder
				/>
				<div className="flex flex-col justify-center">
					{/* Tối ưu Link và fallback text */}
					<Link
						href="/details"
						prefetch={false} // Tắt prefetch
						className="flex font-medium text-white hover:underline"
					>
						{value || "Unknown"}
					</Link>
					{/* Fallback cho tên ngân hàng */}
					<p className="text-xs text-gray-300">{bankName || "No Bank Name"}</p>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		// So sánh props để ngăn render lại không cần thiết
		return (
			prevProps.value === nextProps.value &&
			prevProps.data?.icon === nextProps.data?.icon &&
			prevProps.data?.bankName === nextProps.data?.bankName
		);
	},
);

SymbolCellRenderer.displayName = "SymbolCellRenderer";

// AmountCellRenderer Component
export const AmountCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		// Format và memo hóa giá trị
		const formattedValue = useMemo(() => {
			return typeof value === "number" ? value.toLocaleString("en-US") : "--";
		}, [value]);

		const currency = data?.currency || "";

		return (
			<div className="text-right">
				<span className="font-medium text-green-500">
					{formattedValue} {currency}
				</span>
			</div>
		);
	},
	(prevProps, nextProps) => {
		// So sánh props để tránh render lại
		return (
			prevProps.value === nextProps.value &&
			prevProps.data?.currency === nextProps.data?.currency
		);
	},
);

AmountCellRenderer.displayName = "AmountCellRenderer";
