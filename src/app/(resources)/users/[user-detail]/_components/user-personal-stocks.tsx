"use client";

import { type ColDef, type ValueGetterParams } from "ag-grid-community";

import AgGridComponent from "~/components/ag-gridtable/ag-gridtable";
import { stockDatas } from "~/shared/data/data";
import { type Stock } from "~/shared/types";

const UserPersonalStock = () => {
	const columnDefs: ColDef<Stock>[] = [
		{
			headerName: "STT",
			valueGetter: (params: ValueGetterParams<Stock>) => {
				return params.node?.rowIndex != null ? params.node.rowIndex + 1 : 0;
			},
			maxWidth: 100,
		},
		{
			headerName: "Mã chứng khoán",
			field: "stockCode",
		},
		{
			headerName: "Giá tham chiếu",
			field: "referencePrice",
		},
		{
			headerName: "Ngày mua",
			field: "purchaseDate",
		},
		{
			headerName: "Giá mua",
			field: "purchasePrice",
		},
		{
			headerName: "Ghi chú",
			field: "note",
		},
	];

	return (
		<div className=" w-full rounded-lg px-5">
			<AgGridComponent
				data={stockDatas}
				columnDefs={columnDefs}
				defaultColDef={{
					flex: 1,
					resizable: true,
					sortable: true,
					filter: true,
				}}
				handleClick={() => {}}
			/>
		</div>
	);
};

export default UserPersonalStock;
