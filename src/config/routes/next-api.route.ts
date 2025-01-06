const PREFIX = "/api";

export const NEXT_API_URL = {
	AUTH: {
		LOGIN: `${PREFIX}/auth/login`,
		LOGOUT: `${PREFIX}/auth/logout`,
		REFRESH_ACCESS_TOKEN: `${PREFIX}/auth/refresh-access-token`,
	},
};
