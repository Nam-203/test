import React from "react";
import { Skeleton } from "@nextui-org/react";

import { cn } from "~/shared/utils";

interface ICustomLoadingSidebarSkeletonProps {
	className?: string;
}
const CustomLoadingSidebarSkeleton = ({
	className,
}: ICustomLoadingSidebarSkeletonProps) => {
	return (
		<div className={cn("w-full p-2", className)}>
			<div className="mb-8 flex w-full items-center gap-3">
				<div>
					<Skeleton className="flex h-12 w-12 rounded-full" />
				</div>
				<div className="flex w-full flex-col gap-2">
					<Skeleton className="h-3 w-3/5 rounded-lg" />
					<Skeleton className="h-3 w-4/5 rounded-lg" />
				</div>
			</div>
			<div className="mb-5 flex w-full flex-col gap-2">
				<Skeleton className="h-3 w-3/5 rounded-lg" />
			</div>
			<div className="flex flex-col gap-2">
				<Skeleton className="w-2/5 rounded-lg">
					<div className="h-8 rounded-lg bg-default-300" />
				</Skeleton>
				<Skeleton className="w-3/5 rounded-lg">
					<div className="h-8 rounded-lg bg-default-300" />
				</Skeleton>
				<Skeleton className="w-4/5 rounded-lg">
					<div className="h-8 rounded-lg bg-default-300" />
				</Skeleton>
			</div>
		</div>
	);
};

export default CustomLoadingSidebarSkeleton;
