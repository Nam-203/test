"use client";

import { useEffect, useMemo, useState } from "react";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";

import { fetchAdminData } from "~/components/AdminTableComponent/admin";
import { type Admin } from "~/shared/types";

const AdminTable: React.FC = () => {
	const [adminList, setAdminList] = useState<Admin[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await fetchAdminData();
				setAdminList(data);
			} catch (error) {
				// Optionally handle error
			} finally {
				setLoading(false);
			}
		};

		// eslint-disable-next-line no-void
		void loadData();
	}, []);

	const columnDefs: ColDef[] = useMemo(
		() => [
			{
				headerName: "STT",
				valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
				width: 80,
			},
			{ headerName: "Tên admin", field: "name", sortable: true, filter: true },
			{ headerName: "Mật khẩu", field: "password" },
			{ headerName: "Trạng thái", field: "status", sortable: true },
			{ headerName: "Danh sách quyền", field: "roles" },
			{ headerName: "Ngày tạo", field: "createdAt", sortable: true },
			{ headerName: "Người tạo", field: "createdBy" },
			{ headerName: "Ghi chú", field: "notes" },
		],
		[],
	);

	const hrefValue = adminList.length > 0 ? "/admin-list" : "/fallback-link";

	return (
		<Link href={hrefValue}>
			<div className="p-6">
				{loading ? (
					<p className="text-center text-gray-600">Đang tải dữ liệu...</p>
				) : (
					<div
						className="ag-theme-alpine"
						style={{ height: 400, width: "100%" }}
					>
						<AgGridReact
							rowData={adminList}
							columnDefs={columnDefs}
							defaultColDef={{
								flex: 1,
								minWidth: 150,
								resizable: true,
								sortable: true,
								filter: true,
							}}
						/>
					</div>
				)}
			</div>
		</Link>
	);
};

export default AdminTable;
