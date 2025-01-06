import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type {
	UseMutationHooksProps,
	UseMutationHooksReturn,
} from "../types/typeProps";

export const useMutationHooks = <
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
>(
	props: UseMutationHooksProps<TData, TError, TVariables, TContext>,
): UseMutationHooksReturn<TData, TError, TVariables, TContext> => {
	const { fnCallback, options } = props;

	const mutation = useMutation<TData, TError, TVariables, TContext>({
		mutationFn: fnCallback,
		...options,
	} as UseMutationOptions<TData, TError, TVariables, TContext>);

	return mutation;
};
