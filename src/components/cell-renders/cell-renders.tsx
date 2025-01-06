import { memo, useMemo } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Link from "next/link";

import type { TradingAccount } from "~/shared/types/typeProps";

export const SymbolCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const iconSrc = useMemo(() => data?.icon ?? "", [data?.icon]);
		const bankName = useMemo(() => data?.bankName, [data?.bankName]);
		const displayValue = useMemo(() => String(value ?? "Unknown"), [value]);
		const displayBankName = useMemo(
			() => bankName || "No Bank Name",
			[bankName],
		);

		return (
			<div className="flex items-center gap-3">
				<Image
					src={iconSrc || "/default-icon.webp"}
					alt={String(displayValue)}
					className="h-8 w-8 rounded-full bg-gray-700"
					width={32}
					height={32}
					loading="lazy"
				/>
				<div className="flex flex-col justify-center">
					<Link
						href="/details"
						prefetch={false}
						className="flex font-medium text-white"
					>
						{displayValue}
					</Link>
					<p className="text-xs text-white">{displayBankName}</p>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.value === nextProps.value &&
			prevProps.data?.icon === nextProps.data?.icon &&
			prevProps.data?.bankName === nextProps.data?.bankName
		);
	},
);

SymbolCellRenderer.displayName = "SymbolCellRenderer";

export const AmountCellRenderer = memo(
	({ value, data }: ICellRendererParams<TradingAccount>) => {
		const formattedValue = useMemo(() => {
			if (typeof value !== "number") return "";
			try {
				return value.toLocaleString();
			} catch {
				return String(value);
			}
		}, [value]);

		const currency = useMemo(() => data?.currency || "", [data?.currency]);

		return (
			<div className="text-right">
				<div className="font-medium text-green-500">
					{formattedValue} {currency}
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.value === nextProps.value &&
			prevProps.data?.currency === nextProps.data?.currency
		);
	},
);

AmountCellRenderer.displayName = "AmountCellRenderer";
