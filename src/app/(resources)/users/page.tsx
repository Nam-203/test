import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { CustomLoadingSkeletonResources } from "~/components/shared/custom-loading-skeleton-resources";
import { type LocaleMetadata } from "~/shared/types/common.type";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(
		`~/config/locales/${locale}/common.json`
	)) as LocaleMetadata;

	return {
		title: title.metadata.title.users,
	};
}

const UsersManagementForm = dynamic(
	() => import("./_components/users-management-form"),
	{
		ssr: false,
		loading: () => <CustomLoadingSkeletonResources />,
	},
);

function UserManagementPage() {
	return <UsersManagementForm />;
}

export default UserManagementPage;
