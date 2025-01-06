import Cookies from "js-cookie";

export type ICookieKeys =
	| "userInfo"
	| "language"
	| "accessToken"
	| "actionPermissions"
	| "resourcePermissions";

interface IUseCookieStore {
	getCookie: (key: ICookieKeys) => string | undefined;
	setCookie: (
		key: ICookieKeys,
		value: string,
		options?: Cookies.CookieAttributes,
	) => void;
	removeCookie: (key: ICookieKeys) => void;
}

const useCookieStore: IUseCookieStore = {
	getCookie: (key: ICookieKeys): string | undefined => {
		return Cookies.get(key);
	},
	setCookie: (
		key: ICookieKeys,
		value: string,
		options?: Cookies.CookieAttributes,
	) => {
		Cookies.set(key, value, {
			secure: process.env.NODE_ENV !== "development",
			path: "/",
			sameSite: "lax",
			...options,
		});
	},
	removeCookie: (key: ICookieKeys) => {
		Cookies.remove(key, { path: "/" });
	},
};

export default useCookieStore;
