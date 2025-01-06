import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { CustomLoadingSkeletonResources } from "~/components/shared/custom-loading-skeleton-resources";
import { type CommonLocale } from "~/shared/types";

export async function generateMetadata() {
	const locale = cookies().get("language")?.value || "en";
	const title = (await import(
		`~/config/locales/${locale}/common.json`
	)) as CommonLocale;
	return {
		title: title.metadata.title.rolesPermissions,
	};
}

const RolesForm = dynamic(() => import("./_components/roles-form"), {
	ssr: false,
	loading: () => <CustomLoadingSkeletonResources />,
});

const RolesPage = () => {
	return <RolesForm />;
};

export default RolesPage;
