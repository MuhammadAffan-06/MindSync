/* eslint-disable  @typescript-eslint/no-explicit-any */
export const PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/verify",
  "/auth/logout",
  "/presentation/create",
  "/presentation/save",
  "/presentation/live",
  "/presentation/get",
  "/presentation/all",
  "/presentation/isLive",
  "/blob/upload"
] as const;

export type Path = (typeof PATHS)[number];

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface Response<T = any> extends BaseResponse {
  data?: T;
}
