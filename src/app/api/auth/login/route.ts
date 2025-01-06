import { AxiosError, HttpStatusCode } from "axios";
import { AES } from "crypto-js";
import { cookies } from "next/headers";
import { type NextRequest, type NextResponse } from "next/server";

import { authApiRequest, userApiRequest } from "~/api-requests";
import envConfig from "~/config/env";
import { NextServerResponse } from "~/shared/classes/next-server-response.class";
import { calculateTokenTimeConstants } from "~/shared/constants";
import { jwtExpireTimes } from "~/shared/utils/token.util";
import {
	type LoginRes,
	type TApiError,
	type TLoginReq,
} from "~/shared/validators";

async function loginHandler(req: NextRequest): Promise<NextResponse> {
	const body = (await req.json()) as TLoginReq;
	const cookieStore = cookies();

	try {
		const tokensRes = await authApiRequest.loginToApiServer(body, {
			headers: {
				"accept-language": req.headers.get("accept-language"),
				"accept-time-zone": req.headers.get("accept-time-zone"),
			},
		});

		const { accessToken, refreshToken } = tokensRes.data.data?.tokens ?? {};

		if (!accessToken || !refreshToken) {
			throw new Error("Invalid response");
		}

		// Combine permissions and user info requests into a single request if possible
		const [resourcePermissions, actionPermissions, userInfo] =
			await Promise.all([
				authApiRequest.getResourcePermissions(accessToken),
				authApiRequest.getActionPermissions(accessToken),
				userApiRequest.getMe(accessToken),
			]);

		const decodedAccessToken = jwtExpireTimes(accessToken);
		const decodedRefreshToken = jwtExpireTimes(refreshToken);
		const { ACCESS_TOKEN } = calculateTokenTimeConstants(decodedAccessToken);

		// Encrypt data using AES
		const encryptedUserInfo = AES.encrypt(
			JSON.stringify(userInfo.data.data),
			envConfig.ENCRYPTION_SECRET,
		).toString();
		const encryptedResourcePermissions = AES.encrypt(
			JSON.stringify(resourcePermissions.data.data),
			envConfig.ENCRYPTION_SECRET,
		).toString();
		const encryptedActionPermissions = AES.encrypt(
			JSON.stringify(actionPermissions.data.data),
			envConfig.ENCRYPTION_SECRET,
		).toString();

		cookieStore.set("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: decodedRefreshToken.exp - decodedRefreshToken.iat,
			path: "/",
			sameSite: "lax",
		});

		cookieStore.set("accessToken", accessToken, {
			secure: process.env.NODE_ENV !== "development",
			maxAge:
				decodedAccessToken.exp -
				decodedAccessToken.iat +
				ACCESS_TOKEN.EXTENDED_COOKIE_LIFE_TIME,
			path: "/",
			sameSite: "lax",
		});

		cookieStore.set("userInfo", encryptedUserInfo, {
			secure: process.env.NODE_ENV !== "development",
			maxAge: decodedRefreshToken.exp - decodedRefreshToken.iat,
			path: "/",
			sameSite: "lax",
		});

		cookieStore.set("resourcePermissions", encryptedResourcePermissions, {
			secure: process.env.NODE_ENV !== "development",
			maxAge: decodedRefreshToken.exp - decodedRefreshToken.iat,
			path: "/",
			sameSite: "lax",
		});

		cookieStore.set("actionPermissions", encryptedActionPermissions, {
			secure: process.env.NODE_ENV !== "development",
			maxAge: decodedRefreshToken.exp - decodedRefreshToken.iat,
			path: "/",
			sameSite: "lax",
		});

		const nextRes = new NextServerResponse<typeof LoginRes>({
			statusCode: tokensRes.data.statusCode,
			message: tokensRes.data.message,
			data: tokensRes.data.data,
		});

		return nextRes;
	} catch (error) {
		if (error instanceof AxiosError) {
			const apiError = error as AxiosError<TApiError>;
			if (apiError.response) {
				return new NextServerResponse({
					message: apiError.response.data.message,
					statusCode: apiError.response.data.statusCode,
				});
			}
		}
		return new NextServerResponse({
			message: "Internal Server Error",
			statusCode: HttpStatusCode.InternalServerError,
			data: null,
		});
	}
}

export const POST = loginHandler;
