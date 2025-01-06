import "../shared/styles/globals.style.css";

import { type Metadata } from "next";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import BroadcastAuthSync from "~/components/shared/broadcast-auth-sync";
import NextUIProviderClient from "~/components/shared/next-ui-provider-client";
import { TanStackProvider } from "~/config/providers";
import { AuthProvider } from "~/config/providers/auth.provider";

export const metadata: Metadata = {
	title: "next template",
	description: "next template",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();
	const language = cookieStore.get("language")?.value ?? "en";

	return (
		<html lang={language} suppressHydrationWarning>
			<body className="">
				<TanStackProvider>
					{/* <ThemeProvider attribute='class' defaultTheme={EThemes.System} enableSystem disableTransitionOnChange> */}
					{/* <LanguageProvider> */}
					<AuthProvider>
						<BroadcastAuthSync />
						<NextTopLoader showSpinner={false} />
						<NextUIProviderClient>
							<Toaster />
							{children}
						</NextUIProviderClient>
					</AuthProvider>
					{/* </LanguageProvider> */}
					{/* </ThemeProvider> */}
				</TanStackProvider>
			</body>
		</html>
	);
}
