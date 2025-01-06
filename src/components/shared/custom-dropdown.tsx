import type React from "react";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

import { type DropDataProps } from "~/shared/types/typeProps";

const CustomDropdown: React.FC<{ dropData: DropDataProps[] }> = ({
	dropData,
}) => {
	const [selectedKeys, setSelectedKeys] = useState(dropData[0].name);

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered" radius="sm">
					{selectedKeys} <LuChevronDown className="size-4 opacity-70" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Single selection example"
				selectedKeys={selectedKeys}
				selectionMode="single"
				variant="flat"
				onSelectionChange={(keys) =>
					setSelectedKeys(Array.from(keys as Set<string>)[0])
				}
			>
				{dropData.map((data) => (
					<DropdownItem key={data.key}>{data.name}</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};

export default CustomDropdown;
