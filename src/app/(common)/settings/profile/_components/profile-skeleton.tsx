import { Skeleton } from "@nextui-org/react";

const ProfileSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-8">
			<div className="flex flex-col items-start gap-8">
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<Skeleton className="rounded-lg">
							<div className="h-[72px] w-[72px] rounded-lg bg-default" />
						</Skeleton>
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<Skeleton className="rounded-lg">
									<div className="h-[34px] w-[100px] rounded-lg bg-default" />
								</Skeleton>
								<Skeleton className="rounded-lg">
									<div className="h-[34px] w-[100px] rounded-lg bg-default" />
								</Skeleton>
							</div>
							<Skeleton className="rounded-lg">
								<div className="h-5 w-[100px] rounded-lg bg-default" />
							</Skeleton>
						</div>
					</div>
				</div>
				<Skeleton className="rounded-lg">
					<div className="h-[34px] w-[150px] rounded-lg bg-default" />
				</Skeleton>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-start gap-3">
					<Skeleton className="rounded-lg">
						<div className="h-5 w-[150px] rounded-lg bg-default" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-5 w-[300px] rounded-lg bg-default" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-5 w-[150px] rounded-lg bg-default" />
					</Skeleton>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-start gap-3">
					<Skeleton className="rounded-lg">
						<div className="h-5 w-[150px] rounded-lg bg-default" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-5 w-[300px] rounded-lg bg-default" />
					</Skeleton>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
