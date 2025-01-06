import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import CustomLoadingAuthForm from "~/components/shared/custom-loading-auth-form";
import { type CommonLocale } from "~/shared/types";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(
		`~/config/locales/${locale}/common.json`
	)) as CommonLocale;
	return {
		title: title.metadata.title.login,
	};
}

const LoginForm = dynamic(() => import("./_components/login-form"), {
	ssr: false,
	loading: () => <CustomLoadingAuthForm />,
});

export default function LoginPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-auth-background bg-cover bg-center py-20">
			<LoginForm />
		</div>
	);
}
