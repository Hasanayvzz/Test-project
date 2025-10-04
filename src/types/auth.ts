export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string | null;
  data: {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    tokenType: string;
  };
}

export interface UserData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  expiresIn: number | null;
  refreshExpiresAt: number | null;
  refreshExpiresIn: number | null;
  tokenType: string | null;
  email: string | null;
  fullName?: string | null;
}

export interface RefreshTokenResponse {
  status: number;
  message: string | null;
  data: {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
  };
}
