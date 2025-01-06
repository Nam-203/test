import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	Autocomplete,
	AutocompleteItem,
	type AutocompleteProps,
} from "@nextui-org/react";
import clsx from "clsx";

import reactI18n from "~/config/i18n/react-i18n";

type AutocompleteItemElement = React.ReactElement<
	React.ComponentProps<typeof AutocompleteItem>
>;

interface ICustomAutocompleteProps extends Omit<AutocompleteProps, "children"> {
	options?: {
		key: string;
		value: string;
		[key: string]: unknown;
	}[];
	validationErrorMessage?: string;
	register?: UseFormRegisterReturn;
	children?: AutocompleteItemElement | AutocompleteItemElement[];
}

const CustomAutocomplete = ({
	options,
	validationErrorMessage,
	children,
	labelPlacement = "outside",
	register,
	...props
}: React.PropsWithChildren<ICustomAutocompleteProps>) => {
	const { t } = useTranslation("validations", { i18n: reactI18n });

	const renderChildren = React.useMemo(() => {
		if (options) {
			return options.map((option) => {
				return (
					<AutocompleteItem key={option.key} value={option.value}>
						{option.value}
					</AutocompleteItem>
				);
			});
		}
		return [];
	}, [children, options]);

	return (
		<div className="flex flex-col">
			<Autocomplete
				allowsCustomValue
				{...props}
				labelPlacement={labelPlacement}
				inputProps={{
					classNames: {
						base: "border border-color-medium rounded bg-lighter focus-within:ring-4 focus-within:ring-blue-10 focus-within:border-blue-90",
						inputWrapper: clsx(
							"border border-color-medium rounded bg-lighter",
							{
								"border-red-20 rounded focus-within:ring-red-10 focus-within:border-red-90 bg-red-10":
									validationErrorMessage,
							},
						),
						label: "font-semibold text-xs !text-light",
					},
				}}
				classNames={{
					...props.classNames,
				}}
			>
				{renderChildren}
			</Autocomplete>
			{validationErrorMessage && (
				<p className="mt-1 text-xs font-normal text-danger">
					{t(String(validationErrorMessage))}
				</p>
			)}
		</div>
	);
};

export default CustomAutocomplete;
