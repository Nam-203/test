import { memo } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Link from "next/link";

import type { TradingAccount } from "~/shared/types/typeProps";

export const SymbolCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const iconSrc = data?.icon ?? "";

		return (
			<div className="flex items-center gap-3">
				<Image
					src={iconSrc}
					alt={String(value ?? "")}
					className="h-8 w-8 rounded-full bg-gray-700"
					width={32}
					height={32}
					priority
					loading="eager"
				/>
				<div className="flex flex-col justify-center">
					<Link href="/details" className="flex font-medium text-white">
						{value}
					</Link>
					<p className="text-xs text-white">ACB</p>
				</div>
			</div>
		);
	},
);

SymbolCellRenderer.displayName = "SymbolCellRenderer";

export const AmountCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const formattedValue =
			typeof value === "number" ? value.toLocaleString() : "";

		return (
			<div className="text-right">
				<div className="font-medium text-green-500">
					{formattedValue} {data?.currency}
				</div>
			</div>
		);
	},
);

AmountCellRenderer.displayName = "AmountCellRenderer";
