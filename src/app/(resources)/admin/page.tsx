import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Skeleton } from "@nextui-org/react";
import dynamic from "next/dynamic";

const AdminTable = dynamic(() => import("./root/components/admin-table"), {
	ssr: false,
	loading: () => <Skeleton className="h-12 rounded-lg bg-default-200" />,
});

export async function generateMetadata() {
	return {};
}

const DashboardPage = () => <AdminTable />;

export default DashboardPage;
