import type React from "react";
import { Skeleton } from "@nextui-org/react";
import dynamic from "next/dynamic";

interface IAuthLayoutProps {
	children: React.ReactNode;
}

const SelectLanguage = dynamic(
	() => import("~/components/shared/select-language"),
	{
		ssr: false,
		loading: () => (
			<Skeleton className="rounded-lg">
				<div className="h-12 rounded-lg bg-default-500" />
			</Skeleton>
		),
	},
);

const AuthLayout = ({ children }: IAuthLayoutProps) => {
	return (
		<div className="relative">
			<div className="absolute right-2 top-2 w-full max-w-32">
				<SelectLanguage />
			</div>
			{children}
		</div>
	);
};

export default AuthLayout;
