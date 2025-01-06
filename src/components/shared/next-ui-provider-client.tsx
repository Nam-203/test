"use client";

import { useTranslation } from "react-i18next";
import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";

import reactI18n from "~/config/i18n/react-i18n";

const NextUIProviderClient = ({ children }: { children: React.ReactNode }) => {
	const { i18n } = useTranslation("", { i18n: reactI18n });

	return (
		<NextUIProvider locale={i18n.language}>
			<I18nProvider locale={i18n.language}>{children}</I18nProvider>
		</NextUIProvider>
	);
};

export default NextUIProviderClient;
