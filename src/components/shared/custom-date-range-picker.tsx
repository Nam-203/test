/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useTranslation } from "react-i18next";
import { DateRangePicker, type DateRangePickerProps } from "@nextui-org/react";
import clsx from "clsx";

import reactI18n from "~/config/i18n/react-i18n";

interface ICustomDateRangePickerProps
	extends Omit<DateRangePickerProps, "children"> {
	validationErrorMessage?: string;
	register?: any;
}

const CustomDateRangePicker: React.FC<ICustomDateRangePickerProps> = ({
	validationErrorMessage,
	register,
	labelPlacement = "outside",
	...props
}) => {
	const { t } = useTranslation("validations", { i18n: reactI18n });

	return (
		<>
			<DateRangePicker
				{...register}
				{...props}
				label={props.label}
				labelPlacement={labelPlacement}
				classNames={{
					inputWrapper: clsx("border border-color-medium rounded bg-lighter", {
						"border-red-20 rounded focus-within:ring-red-10 focus-within:border-red-90 bg-red-10":
							validationErrorMessage,
					}),
					label: "text-light font-semibold text-xs",
				}}
			/>
			{validationErrorMessage && (
				<p className="mt-1 text-start text-xs font-normal text-danger">
					{t(String(validationErrorMessage))}
				</p>
			)}
		</>
	);
};

export default CustomDateRangePicker;
