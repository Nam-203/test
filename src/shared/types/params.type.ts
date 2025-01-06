import { type DateValue } from "@internationalized/date";

export interface TUserRequestParams {
	page?: string;
	limit?: string;
	reason?: string;
	status?: number;
	typeId?: number;
	requesterId?: string;
	approverId?: string;
	requestTime?: {
		start?: DateValue;
		end?: DateValue;
	};
}

export interface TUserResourceParams {
	page?: string;
	limit?: string;
	fullName?: string;
	companyId?: number | string | undefined;
	email?: string;
	address?: string;
	roleId?: number[] | string[] | undefined | number | string;
	joinDate?: {
		start?: DateValue;
		end?: DateValue;
	};
	companyIds?: number[];
	status?: number;
}

export interface TTimeEntriesResourceParams {
	page?: string;
	limit?: string;
	fullName?: string;
	checkDate?: {
		start?: DateValue;
		end?: DateValue;
	};
	status?: string;
}

export interface TCompanyParams {
	page?: string;
	limit?: string;
	id?: string;
	address?: string;
	companyPolicyId?: string;
}

export interface TCompanyPoliciesParams {
	page?: string;
	limit?: string;
	name?: string;
	startWorkTime?: string;
	endWorkTime?: string;
	startBreakLunchTime?: string;
	endBreakLunchTime?: string;
	startBonusBreakTime?: string;
	endBonusBreakTime?: string;
	startRemoteWorkHours?: string;
	endRemoteWorkHours?: string;
	startYearlyLeaveDays?: string;
	endYearlyLeaveDays?: string;
}
