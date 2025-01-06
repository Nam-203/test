import { AxiosError, HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { type NextRequest, type NextResponse } from "next/server";

import { authApiRequest } from "~/api-requests";
import { NextServerResponse } from "~/shared/classes/next-server-response.class";
import { UNAUTHORIZED_CAUSE } from "~/shared/constants";
import {
	isExpiredRefreshTokenError,
	isInValidRefreshTokenError,
	isUnauthorizedError,
} from "~/shared/utils";
import { isTokenExpired } from "~/shared/utils/token.util";
import { type TApiError, type TLogoutReq } from "~/shared/validators";

const deleteAuthCookies = async () => {
	const cookieStore = cookies();
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");
	cookieStore.delete("userInfo");
	cookieStore.delete("resourcePermissions");
	cookieStore.delete("actionPermissions");
};

async function logoutHandler(req: NextRequest): Promise<NextResponse> {
	const body = (await req.json()) as TLogoutReq;
	const { force } = body;
	try {
		const cookieStore = cookies();
		const refreshToken = cookieStore.get("refreshToken")?.value;

		if (
			force ||
			!refreshToken ||
			refreshToken === "undefined" ||
			isTokenExpired(refreshToken)
		) {
			await deleteAuthCookies();
			return new NextServerResponse({
				statusCode: HttpStatusCode.Ok,
				message: "force logout successful",
			});
		}

		const response = await authApiRequest.logoutApiServer(refreshToken, {
			headers: {
				"accept-language": req.headers.get("accept-language"),
				"accept-time-zone": req.headers.get("accept-time-zone"),
			},
		});

		const nextRes = new NextServerResponse({
			statusCode: response.data.statusCode,
			message: response.data.message,
		});

		await deleteAuthCookies();
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
				await deleteAuthCookies();
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

export const POST = logoutHandler;
