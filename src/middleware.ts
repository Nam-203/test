/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/await-thenable */
import { NextResponse } from "next/server";

// import { normalizePath } from "~/shared/utils/common.util";
// import { decryptData } from "~/shared/utils/crypto";

// async function verifyUserPermissions(request: NextRequest) {
// 	const pathname = normalizePath(request.nextUrl.pathname);
// 	const resourcePermissionCookie = request.cookies.get(
// 		"resourcePermissions",
// 	)?.value;

// 	if (resourcePermissionCookie === undefined) {
// 		return false;
// 	}

// 	const resourcePermissions = await decryptData(resourcePermissionCookie);

// 	if (resourcePermissions && resourcePermissions !== undefined) {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
// 		return resourcePermissions.some((permission: string) =>
// 			pathname.includes(permission),
// 		);
// 	}

// 	return false;
// }

export async function middleware() {
	// const pathname = normalizePath(request.nextUrl.pathname)
	// const accessToken = request.cookies.get('accessToken')?.value
	// const requestRefreshToken = request.cookies.get('refreshToken')?.value
	// const httpOnlyRefreshToken = cookies().get('refreshToken')?.value
	// const isValidAccessToken = accessToken && accessToken !== undefined && !isTokenExpired(accessToken)
	// const isValidRefreshToken = requestRefreshToken && httpOnlyRefreshToken === requestRefreshToken
	// requestRefreshToken !== undefined && !isTokenExpired(requestRefreshToken)

	// if ([...RESOURCES_ROUTES, ...COMMON_ROUTES].includes(pathname) && !isValidRefreshToken) {
	//   return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.nextUrl.origin))
	// }

	// if (AUTH_ROUTES.includes(pathname) && isValidRefreshToken) {
	//   return NextResponse.redirect(new URL(APP_ROUTES.COMMON.ROOT, request.nextUrl.origin))
	// }

	// if (RESOURCES_ROUTES.includes(pathname)) {
	//   if (isValidAccessToken || isValidRefreshToken) {
	//     const isUserValid = await verifyUserPermissions(request)
	//     if (!isUserValid) {
	//       return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.nextUrl.origin))
	//     }
	//     return NextResponse.next()
	//   }
	// }

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/((?!.+\\.[\\w]+$|_next|api).*)", "/(trpc)(.*)"],
};
