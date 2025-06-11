/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Path } from "@/app/types/apiTypes";
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
  "/blob/upload": null;
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
  "/blob/upload": { url: string; token: string };
};

// const serverBaseUrl = "http://localhost:5000";
const serverBaseUrl =  "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net";

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
  "/blob/upload": "GET",
};

export async function apiRequest<T extends Path>(
  path: T,
  body: PathBodyMap[T],
  query?: Record<string, string>
): Promise<PathResponseMap[T]> {
  const method = PATH_METHOD[path];
  const headers = getHeaders();

  const queryString = query ? "?" + new URLSearchParams(query).toString() : "";

  const options: RequestInit = {
    method,
    headers,
    ...(method === "POST" && body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(`${serverBaseUrl}${path}${queryString}`, options);
    const json = await response.json();

    if (!response.ok) {
      console.error("Error response:", json);
      if (json.message) toast.error(json.message);
    }

    json.success = response.ok;
    return json as PathResponseMap[T];
  } catch (error: any) {
    console.error(error);
    toast.error(error.message || "An unexpected error occurred");
    return { success: false } as PathResponseMap[T];
  }
}

export { serverBaseUrl };
