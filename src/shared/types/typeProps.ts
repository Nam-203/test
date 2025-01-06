import {
	type MutationFunction,
	type UseMutationOptions,
	type UseMutationResult,
} from "@tanstack/react-query";
import type { ColDef, RowClickedEvent } from "ag-grid-community";
import type { AgGridReactProps } from "ag-grid-react";

export interface TradingAccount {
	id: number;
	symbol: string;
	bankName: string;
	amount: number;
	currency: string;
	icon: string;
}
export type UserStatus = "Active" | "Inactive";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	passwordC2: string;
	contact: string;
	status: UserStatus;
	roles: string[];
	createdAt: string;
	createdBy: string;
	notes: string;
	referral: string;
	assets: string;
	report: string;
}

export interface AgGridComponentProps<T>
	extends Omit<AgGridReactProps<T>, "rowData" | "columnDefs"> {
	data: T[];
	columnDefs: ColDef<T>[];
	handleClick: (params: RowClickedEvent) => void;
	defaultColDef?: ColDef<T>;
	pagination?: boolean;
	paginationPageSize?: number;
}

export interface MenuItem {
	id: string;
	label: string;
	path: string;
	icon: React.ReactNode;
}

export interface CellRendererParams {
	value: string;
	data: TradingAccount;
}

export interface TradingListProps<T> {
	data: T[];
	columnDefs: ColDef<T>[];
	defaultColDef?: ColDef;
}
export interface MarketUpdateCardProps {
	date: string;
	time: string;
	content: React.ReactNode;
	image: string;
	description: string;
}
export interface NotificationCardProps {
	isVisible: boolean;
	onClose: () => void;
}

export interface Admin {
	id: string;
	name: string;
	password: string;
	status: string;
	roles: string;
	createdAt: string;
	createdBy: string;
	notes: string;
}

export interface UseMutationHooksProps<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
> {
	fnCallback: MutationFunction<TData, TVariables>;
	options?: UseMutationOptions<TData, TError, TVariables, TContext>;
}

export type UseMutationHooksReturn<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
> = UseMutationResult<TData, TError, TVariables, TContext>;

export interface StockProps {
	id: number;
	stockCode: string;
	referencePrice: number;
	purchaseDate: string;
	purchasePrice: number;
	note: string;
}

export interface CreateUserModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

export interface DropDataProps {
	key: string;
	name: string;
}
