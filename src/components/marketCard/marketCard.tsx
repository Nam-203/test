import Image from "next/image";
import Link from "next/link";

import { type MarketUpdateCardProps } from "~/shared/types/typeProps";

export default function MarketUpdateCard({
	date,
	time,
	content,
	description,
	image,
}: MarketUpdateCardProps) {
	return (
		<div className="">
			<div className="">
				<div className="mb-2 flex items-center justify-between">
					<div className=" mt-2 rounded-full border border-[#8c9aa3] bg-[#001B3A] px-4 py-1 text-sm text-white">
						{date}
					</div>
					<div className="flex items-center gap-2 text-white">
						<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
							<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
						</svg>
						{time}
					</div>
				</div>
				<Link href="/notification/1">
					<div className="rounded-lg border border-gray-200 bg-[#ededed] p-4 shadow-md">
						<div className="mb-2 font-semibold">{content}</div>
						{image && (
							<Image
								src={image}
								alt={String(content)}
								width={500}
								height={300}
								className="mt-4 rounded-lg border border-gray-200 bg-white p-2"
							/>
						)}
						<div className="text-sm text-gray-600">
							{description.length > 200 ? (
								<>
									{description.slice(0, 200)}...
									<span className="ml-1 cursor-pointer text-blue-600 hover:underline">
										Read more
									</span>
								</>
							) : (
								description
							)}
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
