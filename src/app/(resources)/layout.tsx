import dynamic from "next/dynamic";

import CustomLoadingSidebarSkeleton from "~/components/shared/custom-loading-sidebar-skeleton";

import TopBar from "./admin/root/components/topbar";

const MainSidebar = dynamic(() => import("~/components/shared/main-sidebar"), {
	ssr: false,
	loading: () => <CustomLoadingSidebarSkeleton />,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-screen w-full">
			<div className="sticky left-0 top-0 flex h-screen flex-[1.5]">
				<MainSidebar />
			</div>
			<div className="my-3 mr-3 flex-[8.5] overflow-x-auto rounded-lg border border-color-medium bg-white px-8">
				<TopBar />
				{children}
			</div>
		</main>
	);
};

export default Layout;
