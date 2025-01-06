import { EResources } from "~/shared/enums/resources";

export const APP_ROUTES = {
	AUTH: {
		REGISTER: "/register",
		LOGIN: "/login",
		LOGOUT: "/logout",
		FORGOT_PASSWORD: "/forgot-password",
		RESEND_VERIFY_ACCOUNT: "/resend-verify-account",
		RESET_PASSWORD: "/reset-password/:userId/:resetPasswordToken",
	},

	COMMON: {
		ROOT: "/",
		SETTINGS: {
			PROFILE: "/settings/profile",
			COMMON: "/settings/common",
		},
		NOT_FOUND: "*",
	},

	RESOURCES: {
		USERS: `/${EResources[EResources.users]}`,
		TIME_ENTRIES: `/${EResources[EResources["time-entries"]]}`,
		USER_REQUESTS: `/${EResources[EResources["user-requests"]]}`,
		SKILLS: `/${EResources[EResources.skills]}`,
		COMPANIES: `/${EResources[EResources.companies]}`,
		ROLES: `/${EResources[EResources.roles]}`,
		TOKENS: `/${EResources[EResources.tokens]}`,
		COMPANY_POLICIES: `/${EResources[EResources["company-policies"]]}`,
		EMPLOYMENT_HISTORIES: `/${EResources[EResources["employment-histories"]]}`,
	},
} as const;

// export const COMMON_ROUTES: string[] = normalizeRoutes([
// 	...Object.values(APP_ROUTES.COMMON),
// ]);
// export const AUTH_ROUTES: string[] = normalizeRoutes([
// 	...Object.values(APP_ROUTES.AUTH),
// ]);

// export const RESOURCES_ROUTES: string[] = normalizeRoutes([
// 	...Object.values(APP_ROUTES.RESOURCES),
// ]);
