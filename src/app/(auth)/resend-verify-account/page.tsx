import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import CustomLoadingAuthForm from "~/components/shared/custom-loading-auth-form";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(`~/config/locales/${locale}/common.json`)) as {
		metadata: { title: { resendVerifyAccount: string } };
	};
	return {
		title: title.metadata.title.resendVerifyAccount,
	};
}
const ResendVerifyAccountForm = dynamic(
	() => import("./_components/resend-verify-account-form"),
	{
		ssr: false,
		loading: () => <CustomLoadingAuthForm />,
	},
);

export default function ResendVerifyAccountPage() {
	return (
		<div className="h-screen w-full bg-auth-background bg-cover bg-center">
			<ResendVerifyAccountForm />
		</div>
	);
}
