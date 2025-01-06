import { create } from "zustand";
import {
	createJSONStorage,
	persist,
	type StorageValue,
} from "zustand/middleware";

import useCookieStore, {
	type ICookieKeys,
} from "~/shared/hooks/use-cookie-store.hook";

interface ILanguageState {
	language: string;
	setLanguage: (language: string) => void;
}

export const useLanguageStore = create<ILanguageState>()(
	persist(
		(set) => ({
			language: useCookieStore.getCookie("language") ?? "en",
			setLanguage: (language: string) => {
				useCookieStore.setCookie("language", language);
				set({ language });
			},
		}),
		{
			name: "language",
			storage: createJSONStorage<ILanguageState>(() => ({
				getItem: (name: string) => {
					const cookieValue = useCookieStore.getCookie(name as ICookieKeys);
					return cookieValue ?? "en";
				},
				setItem: (name: string, value: string) => {
					const cookieValue = JSON.parse(value) as StorageValue<ILanguageState>;
					return useCookieStore.setCookie(
						name as ICookieKeys,
						cookieValue.state.language,
					);
				},
				removeItem: (name: string) =>
					useCookieStore.removeCookie(name as ICookieKeys),
			})),
		},
	),
);
