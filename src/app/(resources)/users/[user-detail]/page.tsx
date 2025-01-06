import dynamic from "next/dynamic";

import UserDetailSkeleton from "./_components/user-detail-skeleton";

const UserDetail = dynamic(() => import("./_components/user-detail"), {
	ssr: false,
	loading: () => <UserDetailSkeleton />,
});

const UserDetailPage = () => {
	return <UserDetail />;
};

export default UserDetailPage;
