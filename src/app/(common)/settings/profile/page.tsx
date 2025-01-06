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
		title: title.metadata.title.profileSettings,
	};
}

const UpdateUserProfileForm = dynamic(
	() => import("./_components/update-user-profile-form"),
	{
		ssr: false,
		loading: () => <CustomLoadingAuthForm />,
	},
);

const SettingsProfilePage = () => {
	return <UpdateUserProfileForm />;
};

export default SettingsProfilePage;
