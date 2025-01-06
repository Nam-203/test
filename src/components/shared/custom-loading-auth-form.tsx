import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const CustomLoadingAuthForm = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<Card className="flex w-[90%] max-w-[500px] flex-col rounded-lg p-8">
				<Skeleton className="mb-4 flex justify-center">
					<div className="h-[150px] w-[150px] rounded-lg bg-default-300" />
				</Skeleton>
				<Skeleton className="mb-8 rounded-lg">
					<div className="h-[30px] w-[200px] rounded-lg bg-default-300" />
				</Skeleton>
				<div className="flex flex-col gap-3">
					<Skeleton className="rounded-lg">
						<div className="h-[45px] w-full rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-[20px] w-[200px] rounded-lg bg-default-300" />
					</Skeleton>
				</div>
			</Card>
		</div>
	);
};

export default CustomLoadingAuthForm;
