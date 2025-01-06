import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TApiResponse } from "~/shared/validators";
import { type RequestTypesResSchema } from "~/shared/validators/schemas/request-type/request-type.schema";

const requestTypesRequest = {
	getAllRequestTypes: () =>
		axiosHttp.get<TApiResponse<typeof RequestTypesResSchema>>(
			API_URL.REQUEST_TYPES.GET_ALL_REQUEST_TYPES,
		),
	getOwnRequestTypes: () =>
		axiosHttp.get<TApiResponse<typeof RequestTypesResSchema>>(
			API_URL.REQUEST_TYPES.GET_OWN_REQUEST_TYPES,
		),
};

export default requestTypesRequest;
