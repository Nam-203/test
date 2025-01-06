import React from "react";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";

interface ICustomInfoTooltipProps {
	content?: string;
}

const CustomInfoTooltip = ({ content }: ICustomInfoTooltipProps) => {
	return (
		<Tooltip
			content={content}
			radius="sm"
			showArrow
			classNames={{ content: "max-w-80" }}
		>
			<Image src="/assets/icons/info.svg" width={12} height={12} alt="info" />
		</Tooltip>
	);
};

export default CustomInfoTooltip;
