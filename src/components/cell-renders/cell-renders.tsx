import { memo } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Link from "next/link";

import type { TradingAccount } from "~/shared/types/typeProps";

export const SymbolCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const iconSrc = data?.icon ?? "";
		const bankName = data?.bankName;

		return (
			<div className="flex items-center gap-3">
				{/* Lazy-load hình ảnh */}
				<Image
					src={iconSrc}
					alt={String(value ?? "")}
					className="h-8 w-8 rounded-full bg-gray-700"
					width={32}
					height={32}
					loading="lazy" // Tối ưu lazy-loading
				/>
				<div className="flex flex-col justify-center">
					{/* Link tối ưu hóa */}
					<Link
						href="/details"
						prefetch={false}
						className="flex font-medium text-white"
					>
						{value}
					</Link>
					{/* Hiển thị tên ngân hàng */}
					<p className="text-xs text-white">{bankName}</p>
				</div>
			</div>
		);
	},
);

SymbolCellRenderer.displayName = "SymbolCellRenderer";

export const AmountCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		// Format giá trị được tối ưu hóa
		const formattedValue =
			typeof value === "number" ? value.toLocaleString() : "";

		return (
			<div className="text-right">
				{/* Định dạng số và hiển thị đơn vị tiền */}
				<div className="font-medium text-green-500">
					{formattedValue} {data?.currency}
				</div>
			</div>
		);
	},
);

AmountCellRenderer.displayName = "AmountCellRenderer";
