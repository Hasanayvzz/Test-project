import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  timeout: 1200000,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async function (req: InternalAxiosRequestConfig) {
    const session = await getSession();

    if (session?.accessToken) {
      req.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return req;
  },
  (err) => Promise.reject(err)
);

const refreshTokens = async (err: AxiosError) => {
  const session = await getSession();
  const refreshToken = session?.refreshToken;

  if (!refreshToken || err.response?.status !== 401) {
    await signOut({ redirect: true, callbackUrl: "/sign-in" });
    throw err;
  }

  try {
    const refreshResponse = await ApiRequest.refreshTokenLogin({
      refreshToken,
    });

    if (refreshResponse.data.status === 0 && refreshResponse.data) {
      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } else {
      throw new Error("Refresh token failed");
    }
  } catch (error) {
    console.error("Refresh Token Error: ", error);
    await signOut({ redirect: true, callbackUrl: "/sign-in" });
    throw error;
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshTokens(error);

        if (newTokens?.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const request = {
  get: async (url: string) => {
    return instance
      .get(url)
      .then((res) => res.data)
      .catch(async (e: AxiosError) => {
        throw e;
      });
  },

  post: async (url: string, body: {}) => {
    return instance
      .post(url, body)
      .then((res) => res.data)
      .catch(async (e: AxiosError) => {
        throw e;
      });
  },
};

export const ApiRequest = {
  login: (payload: { username: string; password: string }) =>
    request.post("/Auth/Login", payload),

  refreshTokenLogin: (payload: { refreshToken: string }) =>
    request.post("/Auth/RefreshTokenLogin", payload),

  collectionGetAll: () => request.get("/Collection/GetAll"),

  getProductsForConstants: (payload: any, id: string) =>
    request.post(`/Collection/${id}/GetProductsForConstants`, payload),

  getFiltersForConstants: (id: number) =>
    request.get(`/Collection/${id}/GetFiltersForConstants`),
};
