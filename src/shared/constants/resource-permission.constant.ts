const resourcePermissions = [
	{
		id: 1,
		name: "user",
		description: "Manage user accounts and authentication.",
		permissions: [
			{ id: 1, action: "readOwn", description: "readOwnUser" },
			{ id: 2, action: "readAll", description: "readAllUser" },
			{ id: 3, action: "create", description: "createUser" },
			{ id: 4, action: "updateAll", description: "updateAllUser" },
			{ id: 5, action: "updateOwn", description: "updateOwnUser" },
			{ id: 6, action: "delete", description: "deleteUser" },
		],
	},
	{
		id: 2,
		name: "time-entries",
		description: "Track and manage user check-in, check-out times.",
		permissions: [
			{ id: 7, action: "readOwn", description: "readOwnTimeEntries" },
			{ id: 8, action: "readAll", description: "readAllTimeEntries" },
			{ id: 9, action: "createOwn", description: "createOwnTimeEntries" },
			{ id: 10, action: "createAll", description: "createAllTimeEntries" },
			{ id: 11, action: "updateOwn", description: "updateOwnTimeEntries" },
			{ id: 12, action: "updateAll", description: "updateAllTimeEntries" },
			{ id: 13, action: "delete", description: "deleteTimeEntries" },
		],
	},
	{
		id: 3,
		name: "user-requests",
		description: "Handle various user requests.",
		permissions: [
			{ id: 14, action: "readOwn", description: "readOwnUserRequests" },
			{ id: 15, action: "readAll", description: "readAllUserRequests" },
			{ id: 16, action: "createOwn", description: "createOwnUserRequests" },
			{ id: 17, action: "createAll", description: "createAllUserRequests" },
			{ id: 18, action: "updateOwn", description: "updateOwnUserRequests" },
			{ id: 19, action: "updateAll", description: "updateAllUserRequests" },
			{ id: 20, action: "deleteOwn", description: "deleteOwnUserRequests" },
			{ id: 21, action: "deleteAll", description: "deleteAllUserRequests" },
		],
	},
	{
		id: 4,
		name: "skills",
		description: "Manage skills data for users.",
		permissions: [
			{ id: 22, action: "read", description: "readSkills" },
			{ id: 23, action: "create", description: "createSkills" },
			{ id: 24, action: "update", description: "updateSkills" },
			{ id: 25, action: "delete", description: "deleteSkills" },
		],
	},
	{
		id: 5,
		name: "companies",
		description: "Manage company profiles.",
		permissions: [
			{ id: 26, action: "read", description: "readCompanies" },
			{ id: 27, action: "create", description: "createCompanies" },
			{ id: 28, action: "update", description: "updateCompanies" },
			{ id: 29, action: "delete", description: "deleteCompanies" },
		],
	},
	{
		id: 6,
		name: "roles",
		description: "Define and manage user roles and permissions.",
		permissions: [
			{ id: 30, action: "read", description: "readRoles" },
			{ id: 31, action: "create", description: "createRoles" },
			{ id: 32, action: "update", description: "updateRoles" },
			{ id: 33, action: "delete", description: "deleteRoles" },
		],
	},
	{
		id: 7,
		name: "tokens",
		description: "Handle token-based authentication.",
		permissions: [
			{ id: 34, action: "read", description: "readTokens" },
			{ id: 35, action: "create", description: "createTokens" },
			{ id: 36, action: "update", description: "updateTokens" },
			{ id: 37, action: "delete", description: "deleteTokens" },
		],
	},
	{
		id: 8,
		name: "company-policies",
		description: "Manage and enforce company policies.",
		permissions: [
			{ id: 38, action: "read", description: "readCompanyPolicies" },
			{ id: 39, action: "create", description: "createCompanyPolicies" },
			{ id: 40, action: "update", description: "updateCompanyPolicies" },
			{ id: 41, action: "delete", description: "deleteCompanyPolicies" },
		],
	},
	{
		id: 9,
		name: "request-types",
		description: "Manage different types of user requests.",
		permissions: [
			{ id: 42, action: "read", description: "readRequestTypes" },
			{ id: 43, action: "create", description: "createRequestTypes" },
			{ id: 44, action: "update", description: "updateRequestTypes" },
			{ id: 45, action: "delete", description: "deleteRequestTypes" },
		],
	},
	{
		id: 10,
		name: "employment-histories",
		description: "Manage employment history records for users.",
		permissions: [
			{ id: 46, action: "readAll", description: "readAllEmploymentHistories" },
			{
				id: 47,
				action: "updateAll",
				description: "updateAllEmploymentHistories",
			},
		],
	},
];

export default resourcePermissions;
