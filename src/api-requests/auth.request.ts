import { type AxiosRequestConfig } from 'axios'

import envConfig from '~/config/env'
import { API_URL, NEXT_API_URL } from '~/config/routes'
import { EBroadcastAuthAction } from '~/shared/enums/broadcast.enum'
import { useCookieStore } from '~/shared/hooks'
import { axiosHttp } from '~/shared/http/axios'
import { emitAuthBroadcast } from '~/shared/utils/broadcast.util'
import { getLoginStatusAndCookies } from '~/shared/utils/client-auth.util'
import {
  type LoginRes,
  type TApiResponse,
  type TChangePasswordReq,
  type TForgotPasswordReq,
  type TLoginReq,
  type TRegisterUserReq,
  type TResetPasswordReq,
  type UsersManagementResSchema
} from '~/shared/validators'
import { type TResendVerifyAccountReq } from '~/shared/validators/schemas/auth/resend-verify-email.schema'
import { type TVerifyAccountReq } from '~/shared/validators/schemas/auth/verify-account.schema'
import {
  type ActionPermissionsArraySchema,
  type ResourcePermissionsSchema
} from '~/shared/validators/schemas/permission/permission.schema'
import { type RefreshAccessTokenRes } from '~/shared/validators/schemas/token/token.schema'

const authApiRequest = {
  loginToApiServer: async (body: TLoginReq, config: AxiosRequestConfig) => {
    const response = await axiosHttp.post<TApiResponse<typeof LoginRes>>(API_URL.AUTH.LOGIN, body, config)
    return response
  },
  loginToNextServer: async (body: TLoginReq) => {
    const { isLoggedIn, accessToken, userInfo, resourcePermissions, actionPermissions } =
      await getLoginStatusAndCookies()

    if (isLoggedIn) {
      emitAuthBroadcast(EBroadcastAuthAction.LoggedIn)
      return Promise.reject(new Error('User is already logged in'))
    }

    if (accessToken || userInfo || resourcePermissions || actionPermissions) {
      await Promise.all([
        useCookieStore.removeCookie('accessToken'),
        useCookieStore.removeCookie('userInfo'),
        useCookieStore.removeCookie('resourcePermissions'),
        useCookieStore.removeCookie('actionPermissions')
      ])
    }

    const response = await axiosHttp.post<TApiResponse<typeof LoginRes>>(NEXT_API_URL.AUTH.LOGIN, body, {
      baseURL: ''
    })

    return response
  },
  logoutApiServer: async (refreshToken: string, config: AxiosRequestConfig) =>
    axiosHttp.post<TApiResponse>(
      API_URL.AUTH.LOGOUT,
      {
        refreshToken
      },
      config
    ),
  logoutNextServer: async (force?: boolean, signal?: AbortSignal | undefined) => {
    const response = await axiosHttp.post<TApiResponse>(
      NEXT_API_URL.AUTH.LOGOUT,
      { force },
      {
        baseURL: envConfig.NEXT_PUBLIC_URL,
        signal
      }
    )
    if (response.status === 200) {
      emitAuthBroadcast(EBroadcastAuthAction.LoggedOut)
    }
    return response
  },
  refreshAccessTokenNextServer: async () =>
    axiosHttp.post<TApiResponse>(
      NEXT_API_URL.AUTH.REFRESH_ACCESS_TOKEN,
      {},
      {
        baseURL: ''
      }
    ),
  refreshAccessTokenApiServer: async (refreshToken: string, config: AxiosRequestConfig) =>
    axiosHttp.post<TApiResponse<typeof RefreshAccessTokenRes>>(
      API_URL.AUTH.REFRESH_ACCESS_TOKEN,
      { refreshToken },
      config
    ),

  register: async (data: TRegisterUserReq) =>
    axiosHttp.post<TApiResponse<typeof UsersManagementResSchema>>(API_URL.AUTH.REGISTER, data),

  forgotPassword: async ({ email }: TForgotPasswordReq) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: async ({ newPassword, token }: Omit<TResetPasswordReq, 'confirmPassword'>) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.RESET_PASSWORD, {
      newPassword,
      token
    }),

  verifyAccount: async ({ newPassword, token }: Omit<TVerifyAccountReq, 'confirmPassword'>) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.VERIFY_ACCOUNT, {
      newPassword,
      token
    }),

  changePassword: async ({ oldPassword, newPassword }: TChangePasswordReq) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.CHANGE_PASSWORD, {
      oldPassword,
      newPassword
    }),

  verifyToken: async (token?: string) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.VERIFY_TOKEN, {
      token
    }),
  getResourcePermissions: async (accessToken?: string) =>
    axiosHttp.get<TApiResponse<typeof ResourcePermissionsSchema>>(API_URL.AUTH.GET_RESOURCE_PERMISSIONS, {
      headers: {
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }),
  getActionPermissions: async (accessToken?: string) =>
    axiosHttp.get<TApiResponse<typeof ActionPermissionsArraySchema>>(API_URL.AUTH.GET_ACTION_PERMISSIONS, {
      headers: {
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }),
  verifyRefreshToken: async (refreshToken: string) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.VERIFY_REFRESH_TOKEN, {
      refreshToken
    }),
  resendVerifyAccount: async ({ email }: TResendVerifyAccountReq) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.RESEND_VERIFY_ACCOUNT, { email })
}

export default authApiRequest
