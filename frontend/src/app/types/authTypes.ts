/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseResponse } from "./apiTypes";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
  role: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface SignupResponse extends BaseResponse {}
export interface VerifyResponse extends BaseResponse {}
export interface LogoutResponse extends BaseResponse {}
