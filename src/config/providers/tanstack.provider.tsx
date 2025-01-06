"use client";

import { type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 3600000,
			retry: 1,
			retryDelay: 5000,
		},
	},
});

const TanStackProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default TanStackProvider;
