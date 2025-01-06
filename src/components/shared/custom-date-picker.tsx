/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as React from "react";
import { type Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DatePicker, type DatePickerProps } from "@nextui-org/react";
import clsx from "clsx";

import reactI18n from "~/config/i18n/react-i18n";

interface CustomDatePickerProps
	extends Omit<DatePickerProps, "children" | "onChange"> {
	validationErrorMessage?: string;
	control: Control<any>;
	name: string;
	dateInputClassNames?: Partial<{
		base: string;
		label: string;
		inputWrapper: string;
		input: string;
		helperWrapper: string;
		description: string;
		errorMessage: string;
	}>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	validationErrorMessage,
	control,
	name,
	labelPlacement = "outside",
	dateInputClassNames = {},
	...props
}) => {
	const { t } = useTranslation("validations", { i18n: reactI18n });

	return (
		<div className="flex flex-col">
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					return (
						<DatePicker
							{...props}
							labelPlacement={labelPlacement}
							hideTimeZone
							showMonthAndYearPickers
							value={field.value}
							onChange={(date) => field.onChange(date)}
							dateInputClassNames={{
								base: clsx("w-full", dateInputClassNames.base),
								label: clsx(
									"text-light font-semibold text-xs",
									dateInputClassNames.label,
								),
								inputWrapper: clsx(
									"border border-color-medium rounded bg-lighter focus-within:ring-4 focus-within:ring-blue-10 focus-within:border-blue-90",
									{
										"border-red-20 focus-within:ring-red-10 focus-within:border-red-90":
											validationErrorMessage,
									},
									dateInputClassNames.inputWrapper,
								),
								input: clsx(
									"text-primary text-sm font-normal",
									dateInputClassNames.input,
								),
								helperWrapper: clsx("", dateInputClassNames.helperWrapper),
								description: clsx("", dateInputClassNames.description),
								errorMessage: clsx("", dateInputClassNames.errorMessage),
							}}
							popoverProps={{
								classNames: {
									content: "p-0 border-small border-divider bg-background",
								},
							}}
							selectorButtonProps={{
								size: "sm",
								variant: "light",
								radius: "full",
								isIconOnly: true,
								className: "text-light hover:text-secondary",
							}}
						/>
					);
				}}
			/>
			{validationErrorMessage && (
				<p className="mt-1 text-start text-xs font-normal text-danger">
					{t(String(validationErrorMessage))}
				</p>
			)}
		</div>
	);
};

export default CustomDatePicker;
