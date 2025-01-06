"use client";

import type React from "react";
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge,
	type UseFormRegisterReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	extendVariants,
	Select,
	SelectItem,
	type SelectProps,
} from "@nextui-org/react";
import clsx from "clsx";

import reactI18n from "~/config/i18n/react-i18n";

const BaseCustomSelect = extendVariants(Select, {
	variants: {
		color: {
			custom: {
				trigger:
					"border border-color-medium rounded bg-lighter focus-within:ring-4 focus-within:ring-blue-10 focus-within:border-blue-90",
				value: "text-primary text-sm font-normal",
				content:
					"rounded-lg border border-color-medium shadow-s-light-b-strong",
				label: "text-light font-semibold text-xs",
				listbox: "text-secondary text-xs font-normal",
			},
		},
	},
	defaultVariants: {
		color: "custom",
		size: "md",
	},
	compoundVariants: [
		{
			color: "custom",
		},
	],
});

type SelectItemElement = React.ReactElement<
	React.ComponentProps<typeof SelectItem>
>;

interface CustomSelectProps extends Omit<SelectProps, "children"> {
	options?: {
		key: string | number;
		value: string | number;
		[key: string]: string | number;
	}[];
	validationErrorMessage?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl>
		| undefined;
	children?: SelectItemElement | SelectItemElement[];
	register?: UseFormRegisterReturn;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	validationErrorMessage,
	children,
	labelPlacement = "outside",
	register,
	disabledKeys,
	...props
}) => {
	const { t } = useTranslation("validations", { i18n: reactI18n });

	return (
		<div className="flex flex-col">
			<BaseCustomSelect
				disabledKeys={disabledKeys}
				{...props}
				{...{ ...register, ref: undefined }}
				labelPlacement={labelPlacement}
				classNames={{
					trigger: clsx({
						"border-red-20 focus-within:ring-red-10 focus-within:border-red-90 bg-red-10":
							validationErrorMessage,
					}),
					...props.classNames,
				}}
				isRequired={false}
			>
				{options?.map((option) => (
					<SelectItem key={option.key} value={option.key}>
						{option.value}
					</SelectItem>
				))}
			</BaseCustomSelect>
			{validationErrorMessage && (
				<p className="mt-1 text-xs font-normal text-danger">
					{t(String(validationErrorMessage))}
				</p>
			)}
		</div>
	);
};

export default CustomSelect;
