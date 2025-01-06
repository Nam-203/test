"use client";

import type React from "react";

import reactI18n from "~/config/i18n/react-i18n";
import { useLanguageStore } from "~/shared/hooks";

import CustomSelect from "./custom-select";

const SelectLanguage = () => {
	const { language, setLanguage } = useLanguageStore();

	const handleChangeLanguage = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const { value } = event.target;
		setLanguage(value);
		reactI18n.changeLanguage(value).catch(() => {});
	};

	return (
		<CustomSelect
			value={language}
			onChange={handleChangeLanguage}
			defaultSelectedKeys={[language]}
			disallowEmptySelection
			classNames={{ label: "text-sm font-semibold text-secondary" }}
			options={[
				{ key: "en", value: "English" },
				{ key: "vi", value: "Tiếng Việt" },
			]}
		/>
	);
};

export default SelectLanguage;
