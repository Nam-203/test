import { Loader } from "lucide-react";

import { cn } from "~/shared/utils";

interface ICustomLoadingSpinnerProps {
	fixed?: boolean;
	color?: keyof typeof colorClasses;
	size?: string;
}

const colorClasses = {
	slate: "text-slate-500",
	gray: "text-gray-500",
	zinc: "text-zinc-500",
	neutral: "text-neutral-500",
	stone: "text-stone-500",
	red: "text-red-500",
	orange: "text-orange-500",
	amber: "text-amber-500",
	yellow: "text-yellow-500",
	lime: "text-lime-500",
	green: "text-green-500",
	emerald: "text-emerald-500",
	teal: "text-teal-500",
	cyan: "text-cyan-500",
	sky: "text-sky-500",
	blue: "text-blue-500",
	indigo: "text-indigo-500",
	violet: "text-violet-500",
	purple: "text-purple-500",
	fuchsia: "text-fuchsia-500",
	pink: "text-pink-500",
	rose: "text-rose-500",
};

const CustomLoadingSpinner = ({
	fixed = false,
	color,
	size = "14",
}: ICustomLoadingSpinnerProps) => {
	const colorClass =
		color && color in colorClasses ? colorClasses[color] : colorClasses.blue;
	return (
		<div
			className={cn(
				`inset-0 z-50 flex cursor-wait items-center justify-center`,
				fixed && "fixed",
				"bg-white bg-opacity-90",
			)}
		>
			<div className="absolute inset-0 bg-opacity-20" />
			<div className="relative z-50">
				<Loader className={`animate-spin h-${size} w-${size} ${colorClass}`} />
			</div>
		</div>
	);
};

export default CustomLoadingSpinner;
