/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { forwardRef, useState } from "react";
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge,
	type UseFormRegisterReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { extendVariants, Input, type InputProps } from "@nextui-org/react";
import clsx from "clsx";

import reactI18n from "~/config/i18n/react-i18n";

const BaseCustomInput = extendVariants(Input, {
	variants: {
		color: {
			custom: {
				inputWrapper:
					"border border-color-medium rounded bg-lighter focus-within:ring-4 focus-within:ring-blue-10 focus-within:border-blue-90",
				input: "text-primary text-sm font-normal",
				label: "text-light font-semibold text-xs",
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

interface CustomInputProps extends Omit<InputProps, "children"> {
	validationErrorMessage?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl>
		| undefined;
	register?: UseFormRegisterReturn;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	(
		{
			validationErrorMessage,
			register,
			onChange,
			onBlur,
			value,
			labelPlacement = "outside",
			...props
		},
		_,
	) => {
		const { t } = useTranslation("validations", { i18n: reactI18n });
		const [isVisible] = useState(false);

		return (
			<div className="flex w-full flex-col">
				<BaseCustomInput
					labelPlacement={labelPlacement}
					type={props.type === "password" && isVisible ? "text" : props.type}
					classNames={{
						inputWrapper: clsx({
							"border-red-20 focus-within:ring-red-10 focus-within:border-red-90 bg-red-10":
								validationErrorMessage,
						}),
						...props.classNames,
					}}
					{...(register || { onChange, onBlur, value })}
					{...props}
				/>
				{validationErrorMessage && (
					<p className="mt-1 text-start text-xs font-normal text-danger">
						{t(String(validationErrorMessage))}
					</p>
				)}
			</div>
		);
	},
);

export default CustomInput;
