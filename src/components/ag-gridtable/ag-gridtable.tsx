import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./custum-ag-grid.css";

import { AgGridReact } from "ag-grid-react";

import { type AgGridComponentProps } from "~/shared/types/typeProps";

const AgGridComponent = <T,>(props: AgGridComponentProps<T>) => {
	const { data, handleClick, columnDefs, ...rest } = props;
	return (
		<div className="ag-theme-alpine h-full w-full overflow-auto rounded-lg shadow-lg">
			<AgGridReact
				rowData={data}
				columnDefs={columnDefs}
				{...rest}
				domLayout="autoHeight"
				rowHeight={64}
				onRowClicked={handleClick}
				suppressCellFocus
				animateRows
				rowSelection="single"
			/>
		</div>
	);
};

export default AgGridComponent;
