import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import CustomLoadingAuthForm from "~/components/shared/custom-loading-auth-form";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(`~/config/locales/${locale}/common.json`)) as {
		metadata: { title: { resetPassword: string } };
	};
	return {
		title: title.metadata.title.resetPassword,
	};
}

const ResetPasswordForm = dynamic(
	() => import("./_components/reset-password-form"),
	{
		ssr: false,
		loading: () => <CustomLoadingAuthForm />,
	},
);

const ResetPasswordPage = () => {
	return (
		<div className="h-screen w-full bg-auth-background bg-cover bg-center">
			<ResetPasswordForm />
		</div>
	);
};

export default ResetPasswordPage;
