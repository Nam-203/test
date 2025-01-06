import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

import customToast from "~/components/shared/custom-toast";
import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES, NEXT_API_URL } from "~/config/routes";
import { useCookieStore, useLanguageStore } from "~/shared/hooks";
import {
	isExpiredAccessTokenError,
	isExpiredRefreshTokenError,
	isInValidAccessTokenError,
	isInValidRefreshTokenError,
	isUnprocessableEntityError,
} from "~/shared/utils/axios.util";
import { isClient, resolveBaseURL } from "~/shared/utils/common.util";
import {
	type EntityErrorSchema,
	type TApiError,
	type TApiResponse,
} from "~/shared/validators";

export class Http {
	instance: AxiosInstance;

	private refreshAccessTokenRequest: Promise<void> | null = null;

	constructor(baseURL?: string) {
		const resolvedBaseURL = resolveBaseURL(baseURL);
		this.instance = axios.create({
			baseURL: resolvedBaseURL,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": useLanguageStore.getState().language ?? "en",
				"Accept-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
			},
		});

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.instance.interceptors.request.use(
			this.handleRequest,
			this.handleRequestError,
		);
		this.instance.interceptors.response.use(
			this.handleResponse,
			this.handleResponseError,
		);
	}

	private handleRequest = (config: InternalAxiosRequestConfig) => {
		if (isClient()) {
			const accessToken = useCookieStore.getCookie("accessToken");
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}

			(config.headers["Accept-Language"] =
				useLanguageStore.getState().language ?? "en"),
				(config.headers["Accept-Time-Zone"] =
					Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		return config;
	};

	private handleRequestError = (error: AxiosError<TApiError>) => {
		return Promise.reject(error);
	};

	private handleResponse = (response: AxiosResponse): AxiosResponse => {
		if (
			response.config.responseType === "arraybuffer" &&
			response.headers["content-type"]?.includes(
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			)
		) {
			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			return {
				...response,
				data: blob,
			};
		}
		return response;
	};

	private handleResponseError = async (error: AxiosError<TApiError>) => {
		if (isClient()) {
			const { config, response } = error;

			const errorData = response
				? this.parseArrayBufferErrorResponse(response)
				: null;

			if (errorData && error.response) {
				error.response.data = errorData;
			}

			if (this.shouldRefreshToken(error)) {
				return this.refreshTokenAndRetry(config);
			}

			this.handleErrorDisplay(error);

			if (this.isRefreshTokenError(error)) {
				await this.handleLogout();
			}
		}

		return Promise.reject(error);
	};

	private shouldRefreshToken(error: AxiosError<TApiError>) {
		return (
			isClient() &&
			error.config?.url &&
			(isExpiredAccessTokenError(error) || isInValidAccessTokenError(error)) &&
			error.config.url !== NEXT_API_URL.AUTH.REFRESH_ACCESS_TOKEN
		);
	}

	private async refreshTokenAndRetry(
		config: InternalAxiosRequestConfig | undefined,
	) {
		if (isClient()) {
			this.refreshAccessTokenRequest =
				this.refreshAccessTokenRequest || this.handleRefreshAccessToken();

			try {
				await this.refreshAccessTokenRequest;
				const newAccessToken = Cookies.get("accessToken");

				if (newAccessToken && config) {
					config.headers.Authorization = `Bearer ${newAccessToken}`;
					return this.instance(config);
				}
			} finally {
				this.refreshAccessTokenRequest = null;
			}
		}
	}

	private handleErrorDisplay(error: AxiosError<TApiError>) {
		if (!isClient()) return;

		let errorMessage = error.response?.data.message || error.message;

		if (error.response?.data instanceof ArrayBuffer) {
			const errorText = new TextDecoder().decode(
				new Uint8Array(error.response.data),
			);
			const errorData = JSON.parse(errorText);
			errorMessage = errorData.message;
		}

		if (
			!isUnprocessableEntityError<TApiError<typeof EntityErrorSchema>>(error) &&
			errorMessage
		) {
			customToast.error({
				title: reactI18n.t("common:message.error"),
				content: errorMessage,
			});
		}
	}

	private isRefreshTokenError(error: AxiosError<TApiError>) {
		return (
			isClient() &&
			(isExpiredRefreshTokenError<TApiError>(error) ||
				isInValidRefreshTokenError<TApiError>(error) ||
				isInValidAccessTokenError<TApiError>(error))
		);
	}

	private async handleLogout() {
		if (isClient()) {
			await this.instance.post(
				NEXT_API_URL.AUTH.LOGOUT,
				{ force: true },
				{ baseURL: "" },
			);

			window.location.href = APP_ROUTES.AUTH.LOGIN;
		}
	}

	private async handleRefreshAccessToken(): Promise<void> {
		if (isClient()) {
			await this.instance.post<TApiResponse>(
				NEXT_API_URL.AUTH.REFRESH_ACCESS_TOKEN,
				{},
				{
					baseURL: "",
				},
			);
		}
	}

	private parseArrayBufferErrorResponse(
		response: AxiosResponse,
	): TApiError | null {
		if (
			response &&
			response.status === 401 &&
			response.data instanceof ArrayBuffer
		) {
			const errorText = new TextDecoder().decode(response.data);
			const errorData = JSON.parse(errorText);
			return errorData;
		}
		return null;
	}
}

export const axiosHttp = new Http().instance;
