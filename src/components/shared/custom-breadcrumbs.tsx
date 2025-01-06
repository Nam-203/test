/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import {
	BreadcrumbItem,
	type BreadcrumbItemProps,
	Breadcrumbs,
	type BreadcrumbsProps,
	Skeleton,
} from "@nextui-org/react";

interface ICustomBreadcrumbsProps {
	breadcrumbsProps?: BreadcrumbsProps;
	breadcrumbsItems: BreadcrumbItemProps[];
	isDataFetching?: boolean;
}

const CustomBreadcrumbs = ({
	breadcrumbsProps,
	breadcrumbsItems,
	isDataFetching,
}: ICustomBreadcrumbsProps) => {
	return (
		<>
			{isDataFetching ? (
				<Skeleton className="h-7 w-full max-w-80 rounded-md bg-default-200" />
			) : (
				<Breadcrumbs
					{...breadcrumbsProps}
					itemClasses={{
						item: "text-xl font-medium",
					}}
				>
					{breadcrumbsItems.map((itemProps) => (
						<BreadcrumbItem key={itemProps.id} {...itemProps}>
							{itemProps.children}
						</BreadcrumbItem>
					))}
				</Breadcrumbs>
			)}
		</>
	);
};

export default CustomBreadcrumbs;
