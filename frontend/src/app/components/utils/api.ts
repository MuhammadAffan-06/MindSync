/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Path}  from "@/app/types/apiTypes";
import { LoginRequest, LoginResponse, LogoutResponse, SignupRequest, SignupResponse, VerifyResponse } from "@/app/types/authTypes";
import {
    PresentationAllResponse,
  PresentationCreateResponse,
  PresentationGetRequest,
  PresentationGetResponse,
  PresentationIsLiveRequest,
  PresentationIsLiveResponse,
  PresentationLiveRequest,
  PresentationLiveResponse,
  PresentationSaveRequest,
  PresentationSaveResponse,
} from "@/app/types/presentationTypes";
import { toast } from "react-toastify";

export type PathBodyMap = {
  "/auth/login": LoginRequest;
  "/auth/signup": SignupRequest;
  "/auth/verify": null;
  "/auth/logout": null;
  "/presentation/create": null;
  "/presentation/save": PresentationSaveRequest;
  "/presentation/live": PresentationLiveRequest;
  "/presentation/get": PresentationGetRequest;
  "/presentation/all": null;
  "/presentation/isLive": PresentationIsLiveRequest;
};

export type PathResponseMap = {
  "/auth/login": LoginResponse;
  "/auth/signup": SignupResponse;
  "/auth/verify": VerifyResponse;
  "/auth/logout": LogoutResponse;
  "/presentation/create": PresentationCreateResponse;
  "/presentation/save": PresentationSaveResponse;
  "/presentation/live": PresentationLiveResponse;
  "/presentation/get": PresentationGetResponse;
  "/presentation/all": PresentationAllResponse;
  "/presentation/isLive": PresentationIsLiveResponse;
};

// const serverBaseUrl = "http://localhost:5000";
const serverBaseUrl = "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net"


function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Map of HTTP methods based on path
export const PATH_METHOD: Record<Path, "GET" | "POST"> = {
  "/auth/login": "POST",
  "/auth/signup": "POST",
  "/auth/verify": "GET",
  "/auth/logout": "GET",
  "/presentation/create": "POST",
  "/presentation/save": "POST",
  "/presentation/live": "POST",
  "/presentation/get": "POST",
  "/presentation/all": "GET",
  "/presentation/isLive": "POST",
};
export async function apiRequest<T extends Path>(
    path: T,
    body: PathBodyMap[T]
  ): Promise<PathResponseMap[T]> {
    const options: RequestInit = {
      method: PATH_METHOD[path],
      headers: getHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
  
    try {
      const response = await fetch(serverBaseUrl + path, options);
      const json = await response.json();
  
      if (!response.ok) {
        console.error("Error response:", json);
        if(json.message)
        toast.error(json.message);
      }
      json.success = response.ok;
      return json as PathResponseMap[T];
    } catch (error: any) {
        console.error(error);
      toast.error(error.message || 'An unexpected error occurred');
      return {success: false} as PathResponseMap[T];
    }
  }
  
export { serverBaseUrl };
