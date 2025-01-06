"use client";

import { useCookieStore } from "~/shared/hooks";

export const getLoginStatusAndCookies = async () => {
	const [accessToken, userInfo, resourcePermissions, actionPermissions] =
		await Promise.all([
			useCookieStore.getCookie("accessToken"),
			useCookieStore.getCookie("userInfo"),
			useCookieStore.getCookie("resourcePermissions"),
			useCookieStore.getCookie("actionPermissions"),
		]);

	const isLoggedIn =
		Boolean(accessToken) &&
		Boolean(userInfo) &&
		Boolean(resourcePermissions) &&
		Boolean(actionPermissions);

	return {
		isLoggedIn,
		accessToken,
		userInfo,
		resourcePermissions,
		actionPermissions,
	};
};
