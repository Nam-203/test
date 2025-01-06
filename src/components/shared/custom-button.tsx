import { Button, type ButtonProps, Skeleton } from "@nextui-org/react";

interface ICustomButtonProps extends ButtonProps {
	isDataFetching?: boolean;
}

const CustomButton = ({
	color = "primary",
	className = "rounded-md border border-color-medium py-2 text-xs font-medium text-white",
	children,
	isDataFetching,
	...props
}: ICustomButtonProps) => {
	return isDataFetching ? (
		<Skeleton className="h-10 w-full max-w-40 rounded-md bg-default-200" />
	) : (
		<Button {...props} color="primary" className={className}>
			{children}
		</Button>
	);
};

export default CustomButton;
