"use client";

import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useCookieStore } from "~/shared/hooks";
import { decryptData } from "~/shared/utils/crypto";
import { type TUserProfileRes } from "~/shared/validators";

interface AuthContextType {
	userInfo: TUserProfileRes | null;
	resourcePermissions: string[];
	actionPermissions: string[] | null;
	setUserInfo: (userInfo: TUserProfileRes) => void;
	setResourcePermissions: (permissions: string[]) => void;
	setActionPermissions: (permissions: string[]) => void;
	// refetchPermissions: () => void
}

// Khởi tạo context
const AuthContext = createContext<AuthContextType>({
	userInfo: null,
	resourcePermissions: [],
	actionPermissions: null,
	setUserInfo: () => {},
	setResourcePermissions: () => {},
	setActionPermissions: () => {},
	// refetchPermissions: () => {}
});

interface AuthProviderProps {
	children: React.ReactNode;
}

// Tạo AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [userInfo, setUserInfo] = useState<TUserProfileRes | null>(null);
	const [resourcePermissions, setResourcePermissions] = useState<string[]>([]);
	const [actionPermissions, setActionPermissions] = useState<string[] | null>(
		null,
	);

	const resourcePermissionsCookie = useCookieStore.getCookie(
		"resourcePermissions",
	);
	const actionPermissionsCookie = useCookieStore.getCookie("actionPermissions");

	const userInfoCookie = useCookieStore.getCookie("userInfo");

	useEffect(() => {
		if (userInfoCookie) {
			setUserInfo(decryptData(userInfoCookie));
		}
	}, [userInfoCookie]);

	useEffect(() => {
		if (resourcePermissionsCookie) {
			setResourcePermissions(decryptData(resourcePermissionsCookie));
		}
	}, [resourcePermissionsCookie]);

	useEffect(() => {
		if (actionPermissionsCookie) {
			setActionPermissions(decryptData(actionPermissionsCookie));
		}
	}, [actionPermissionsCookie]);

	// const {
	//   data: actionPermissionsData,
	//   isSuccess: isActionPermissionsSuccess,
	//   refetch
	// } = useQuery({
	//   queryKey: ['actionPermissions'],
	//   queryFn: async () => {
	//     const response = await authApiRequest.getActionPermissionsNextServer()
	//     return response?.data.data
	//   },
	//   enabled: userLoggedIn && actionPermissions === null
	// })

	// useEffect(() => {
	//   if (isActionPermissionsSuccess && actionPermissionsData) {
	//     setActionPermissions(actionPermissionsData)
	//   }
	// }, [isActionPermissionsSuccess, actionPermissionsData])

	const contextValue = useMemo(
		() => ({
			userInfo,
			resourcePermissions,
			actionPermissions,
			setUserInfo,
			setResourcePermissions,
			setActionPermissions,
		}),
		[userInfo, resourcePermissions, actionPermissions],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
