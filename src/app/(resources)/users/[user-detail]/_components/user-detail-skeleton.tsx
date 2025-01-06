export default function UserDetailSkeleton() {
	return (
		<div className="mt-10 flex animate-pulse flex-col gap-10">
			<div className="flex gap-10">
				<div className="h-[300px] w-1/2 rounded-lg bg-gray-200 shadow-lg" />
				<div className="h-[300px] w-1/2 rounded-lg bg-gray-200 shadow-lg" />
			</div>
			<div className="h-[300px] w-full bg-gray-200 shadow-lg" />
		</div>
	);
}
