import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import CustomLoadingAuthForm from "~/components/shared/custom-loading-auth-form";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(`~/config/locales/${locale}/common.json`)) as {
		metadata: { title: Record<string, string> };
	};
	return {
		title: title.metadata.title.forgotPassword || "Default Title",
	};
}

const ForgotPasswordForm = dynamic(
	() => import("./_components/forgot-password-form"),
	{
		ssr: false,
		loading: () => <CustomLoadingAuthForm />,
	},
);

export default function ForgotPasswordPage() {
	return (
		<div className="h-screen w-full bg-auth-background bg-cover bg-center">
			<ForgotPasswordForm />
		</div>
	);
}
