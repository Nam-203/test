import { API_URL } from "~/config/routes";
import { axiosHttp } from "~/shared/http/axios";
import { type TApiResponse } from "~/shared/validators";
import { type DaysOfWeekResSchema } from "~/shared/validators/schemas/days-of-week/days-of-week.schema";

const daysOfWeekRequest = {
	getAllDaysOfWeek: () =>
		axiosHttp.get<TApiResponse<typeof DaysOfWeekResSchema>>(
			API_URL.DAYS_OF_WEEK.GET_ALL_DAYS_OF_WEEK,
		),
};

export default daysOfWeekRequest;
