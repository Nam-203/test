import dynamic from "next/dynamic";

import CustomLoadingSidebarSkeleton from "~/components/shared/custom-loading-sidebar-skeleton";

const MainSidebar = dynamic(() => import("~/components/shared/main-sidebar"), {
	ssr: false,
	loading: () => <CustomLoadingSidebarSkeleton />,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-screen w-full">
			<div className="sticky bottom-0 left-0 top-0 flex h-screen flex-[1.5] justify-start">
				<MainSidebar />
			</div>
			<div className="my-3 mr-3 flex-[8.5] rounded-lg border border-color-medium bg-white p-8">
				{children}
			</div>
		</main>
	);
};

export default Layout;
