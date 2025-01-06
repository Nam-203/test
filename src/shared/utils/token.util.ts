import { jwtDecode } from "jwt-decode";

import { type IAuthTokenPayload } from "~/shared/types";

export const isTokenExpired = (accessToken: string): boolean => {
	try {
		const decodedToken = jwtDecode<IAuthTokenPayload>(accessToken);
		const now = Date.now() / 1000;
		return decodedToken.exp < now;
	} catch (error) {
		console.error("Failed to decode access token", error);
		return true;
	}
};

export const jwtExpireTimes = (token: string): IAuthTokenPayload => {
	return jwtDecode(token);
};
