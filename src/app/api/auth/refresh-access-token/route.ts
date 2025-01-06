import { AxiosError, HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { type NextRequest, type NextResponse } from "next/server";

import { authApiRequest } from "~/api-requests";
import { NextServerResponse } from "~/shared/classes/next-server-response.class";
import {
	calculateTokenTimeConstants,
	UNAUTHORIZED_CAUSE,
} from "~/shared/constants";
import {
	isExpiredRefreshTokenError,
	isInValidRefreshTokenError,
	isUnauthorizedError,
} from "~/shared/utils";
import { isTokenExpired, jwtExpireTimes } from "~/shared/utils/token.util";
import { type TApiError } from "~/shared/validators";

async function refreshAccessTokenHandler(
	req: NextRequest,
): Promise<NextResponse> {
	const cookieStore = cookies();
	const refreshToken = cookieStore.get("refreshToken")?.value;

	if (!refreshToken || isTokenExpired(refreshToken)) {
		await authApiRequest.logoutNextServer(true);
		return new NextServerResponse({
			message: "Unauthorized",
			statusCode: HttpStatusCode.Unauthorized,
			data: { cause: UNAUTHORIZED_CAUSE.REFRESH_TOKEN.INVALID },
		});
	}

	try {
		const response = await authApiRequest.refreshAccessTokenApiServer(
			refreshToken,
			{
				headers: {
					"accept-language": req.headers.get("accept-language"),
					"accept-time-zone": req.headers.get("accept-time-zone"),
				},
			},
		);

		const accessToken = String(response.data.data?.tokens.accessToken);
		const decodedAccessToken = jwtExpireTimes(accessToken);
		const { ACCESS_TOKEN } = calculateTokenTimeConstants(decodedAccessToken);
		const maxAge = String(
			decodedAccessToken.exp -
				decodedAccessToken.iat +
				ACCESS_TOKEN.EXTENDED_COOKIE_LIFE_TIME,
		);

		const nextRes = new NextServerResponse({
			statusCode: response.data.statusCode,
			message: response.data.message,
		});

		nextRes.headers.append(
			"Set-Cookie",
			`accessToken=${accessToken}; Max-Age=${maxAge}; Path=/; SameSite=Lax`,
		);
		return nextRes;
	} catch (error) {
		if (error instanceof AxiosError) {
			const apiError = error as AxiosError<TApiError>;
			if (
				apiError.response &&
				isUnauthorizedError(apiError) &&
				(isExpiredRefreshTokenError(apiError) ||
					isInValidRefreshTokenError(apiError))
			) {
				await authApiRequest.logoutNextServer(true);
				return new NextServerResponse({
					message: apiError.response.data.message,
					statusCode: apiError.response.status,
					data: { cause: UNAUTHORIZED_CAUSE.REFRESH_TOKEN.INVALID },
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

export const POST = refreshAccessTokenHandler;
