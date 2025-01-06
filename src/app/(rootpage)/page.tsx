"use client";

import { type ColDef } from "ag-grid-community";
import { useRouter } from "next/navigation";

import AgGridComponent from "~/components/ag-gridtable/ag-gridtable";
import {
	AmountCellRenderer,
	SymbolCellRenderer,
} from "~/components/cell-renders/cell-renders";
import { accounts } from "~/shared/data/data";
import { type TradingAccount } from "~/shared/types/typeProps";

export default function MarketPage() {
	const router = useRouter();

	const columnDef: ColDef<TradingAccount>[] = [
		{
			field: "symbol",
			headerName: "Symbol",
			flex: 1,
			cellRenderer: SymbolCellRenderer,
			sortable: true,
			filter: true,
		},
		{
			field: "amount",
			headerName: "Amount",
			cellRenderer: AmountCellRenderer,
			sortable: true,
			filter: true,
			width: 150,
		},
	];

	const handleRowClick = () => {
		router.push("/sign-up");
	};
	const getRowStyle = () => {
		return { backgroundColor: "#143045", borderBottom: "0.1px solid #3e5366" };
	};

	return (
		<div className="mt-[95px] h-screen bg-[#011d33]">
			<AgGridComponent
				data={accounts}
				columnDefs={columnDef}
				defaultColDef={{
					flex: 1,
					minWidth: 150,
					resizable: true,
					sortable: true,
					filter: true,
				}}
				handleClick={handleRowClick}
				headerHeight={0}
				getRowStyle={getRowStyle}
			/>
		</div>
	);
}
