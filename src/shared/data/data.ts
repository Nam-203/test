import { type StockProps, type TradingAccount } from "../types/typeProps";

export const accounts: TradingAccount[] = [
	{
		id: 1,
		symbol: "VNID",
		bankName: "VCB Foreign Trade Bank",
		amount: 11000,
		currency: "VND",
		icon: "/icon-vcbs.png",
	},
	{
		id: 2,
		symbol: "USDT",
		bankName: "VCB Foreign Trade Bank",
		amount: 11000,
		currency: "VND",
		icon: "/icon-vcbs.png",
	},
	{
		id: 3,
		symbol: "BITCOIN",
		bankName: "VCB Foreign Trade Bank",
		amount: 11000,
		currency: "VND",
		icon: "/icon-vcbs.png",
	},
	{
		id: 4,
		symbol: "VCBS",
		bankName: "VCB Foreign Trade Bank",
		amount: 11000,
		currency: "VND",
		icon: "/icon-vcbs.png",
	},
];

export const stockDatas: StockProps[] = [
	{
		id: 1,
		stockCode: "JKQ",
		referencePrice: 1500,
		purchaseDate: "10/02/2025",
		purchasePrice: 1400,
		note: "text",
	},
	{
		id: 2,
		stockCode: "ABC",
		referencePrice: 4000,
		purchaseDate: "15/02/2025",
		purchasePrice: 2400,
		note: "text",
	},
	{
		id: 3,
		stockCode: "DFA",
		referencePrice: 1500,
		purchaseDate: "16/02/2025",
		purchasePrice: 6000,
		note: "text",
	},
	{
		id: 4,
		stockCode: "KAV",
		referencePrice: 1800,
		purchaseDate: "17/02/2025",
		purchasePrice: 600,
		note: "text",
	},
];

export const ROLE_DATA = [
	{ key: "admin", name: "Admin" },
	{ key: "user", name: "User" },
	{ key: "staff", name: "Staff" },
];

export const ACTIVE_DATA = [
	{ key: "active", name: "Active" },
	{ key: "deactive", name: "Deactive" },
];
