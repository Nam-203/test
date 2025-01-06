import { Header } from "~/components/Header/Header";
import { MenuComponent } from "~/components/menubottom/menubottom";

export default function LayoutPage({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
			<MenuComponent />
		</>
	);
}
