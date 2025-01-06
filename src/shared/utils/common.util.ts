import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import envConfig from "~/config/env";
import reactI18n from "~/config/i18n/react-i18n";

export function interpolateMessage(
	template: string,
	replacements: Record<string, string>,
): string {
	const templateKeys = template.match(/:[a-zA-Z0-9_]+/g) || [];
	return templateKeys.reduce((acc, key) => {
		const cleanKey = key.substring(1);
		const replacement = Object.prototype.hasOwnProperty.call(
			replacements,
			cleanKey,
		)
			? replacements[cleanKey]
			: "";
		return acc.replace(new RegExp(key, "g"), replacement);
	}, template);
}

export function i18nMessageInterpolation<T extends PropertyKey>(
	namespace: string,
	template: string,
	replacements?: Record<T, string | Record<string, string>>,
): string {
	if (typeof window === "undefined") return template;

	const message = reactI18n.t(`${namespace}:message.${template}`) || template;
	const languages = Object.keys(replacements || {}).reduce<string[]>(
		(acc, key) => {
			const replacement = replacements && replacements[key as T];
			if (typeof replacement === "object") {
				acc = Object.keys(replacement);
			}
			return acc;
		},
		[],
	);
	const language = languages.includes(reactI18n.language)
		? reactI18n.language
		: "en";
	const translatedReplacements = Object.keys(replacements || {}).reduce<
		Record<string, string>
	>((acc, key) => {
		const replacement = replacements && replacements[key as T];
		if (typeof replacement === "string") {
			acc[key] = replacement;
		} else if (typeof replacement === "object") {
			acc[key] = replacement[language] || (replacement as unknown as string);
		}
		return acc;
	}, {});
	const result = interpolateMessage(message, translatedReplacements);
	return result;
}

export const normalizePath = (path: string) => {
	if (path === "/") return path;
	return path.startsWith("/") ? path : `/${path}`;
};

export const normalizeRoutes = (
	routes: Record<string, string | Record<string, never>>,
): string[] => {
	let extractedRoutes: string[] = [];
	Object.keys(routes).forEach((key) => {
		if (typeof routes[key] === "string") {
			extractedRoutes.push(routes[key]);
		} else if (typeof routes[key] === "object") {
			extractedRoutes = extractedRoutes.concat(normalizeRoutes(routes[key]));
		}
	});
	return extractedRoutes;
};

export const isClient = (): boolean => typeof window !== "undefined";

export const resolveBaseURL = (baseURL?: string): string => {
	let resolvedBaseURLValue = "";
	if (baseURL === undefined) {
		resolvedBaseURLValue = envConfig.NEXT_PUBLIC_API_ENDPOINT;
	} else if (baseURL === "") {
		resolvedBaseURLValue = envConfig.NEXT_PUBLIC_URL;
	} else {
		resolvedBaseURLValue = baseURL;
	}

	return resolvedBaseURLValue;
};

export const getFullUrl = (url = "", baseUrl?: string): string => {
	const baseURL = resolveBaseURL(baseUrl);
	const cleanedUrl = url.startsWith("/") ? url.slice(1) : url;
	const cleanedBaseUrl = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
	return `${cleanedBaseUrl}/${cleanedUrl}`;
};

export const convertEnumToArray = (
	numberEnum: Record<string, string | number>,
	type: "number" | "string",
) => {
	return Object.values(numberEnum).filter((value) => {
		return typeof value === type;
	});
};

export const convertEnumToObject = (
	enumObj: Record<string, string | number>,
) => {
	return Object.keys(enumObj)
		.filter((key) => !Number.isNaN(Number(key))) // Chỉ lấy các keys là số
		.map((numericKey) => {
			const stringKey = enumObj[numericKey]; // Lấy chuỗi từ giá trị số
			return {
				key: numericKey, // Giữ giá trị số làm key
				value: stringKey, // Giữ chuỗi làm value
			};
		});
};

export const isValidImageSrc = (
	src: string | undefined | null | File,
): boolean => {
	if (!src) return false;

	if (typeof src === "string") {
		src = src.trim();

		if (!src) return false;
		try {
			const url = new URL(src, window.location.origin);
			return (
				url.protocol === "http:" ||
				url.protocol === "https:" ||
				url.protocol === "data:"
			);
		} catch (_) {
			return (
				src.startsWith("/") || src.startsWith("./") || src.startsWith("../")
			);
		}
	} else if (src instanceof File) {
		return src.type.startsWith("image/");
	}

	return false;
};

export const convertUrlToFile = async (
	url: string,
	filename: string,
	mimeType: string,
): Promise<File> => {
	const response = await fetch(url);
	const blob = await response.blob();
	return new File([blob], filename, { type: mimeType });
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isNotNullOrUndefined<T>(
	value: T | null | undefined,
): value is T {
	return value !== null && value !== undefined;
}
