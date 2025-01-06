import type { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import Link from "next/link";

import type { TradingAccount } from "~/shared/types/typeProps";

export const SymbolCellRenderer = ({
	value,
	data,
}: ICellRendererParams<TradingAccount>) => (
	<div className="flex items-center gap-3">
		<Image
			src={data?.icon ?? ""}
			alt={String(value ?? "")}
			className="h-8 w-8 rounded-full bg-gray-700"
			width={32}
			height={32}
		/>
		<div className="flex  flex-col justify-center">
			<Link href="/details" className=" flex font-medium text-white">
				{value}
			</Link>
			<div className="text-xs text-white">{data?.bankName}</div>
		</div>
	</div>
);

export const AmountCellRenderer = ({
	value,
	data,
}: ICellRendererParams<TradingAccount>) => (
	<div className="text-right">
		<div className="font-medium text-green-500">
			{typeof value === "number" ? value.toLocaleString() : ""} {data?.currency}
		</div>
	</div>
);
