import type React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex h-screen w-full">
			<div className="flex-[6] rounded-lg border border-color-medium bg-white p-2 lg:p-8">
				{children}
			</div>
		</main>
	);
};

export default Layout;
