"use client";
import { Suspense, useEffect } from "react";
import Loading from "@/app/components/loading/loading";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const picture = searchParams.get("picture");
  const googleAccessToken = searchParams.get("googleAccessToken"); // <-- New param
  const router = useRouter();

  useEffect(() => {
    if (!token || !name || !email) {
      router.replace("/auth");
      return;
    }

    // Store all data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPicture", picture ?? "/profile-avatar.svg");

    // Store Google Access Token if it exists
    if (googleAccessToken) {
      localStorage.setItem("googleAccessToken", googleAccessToken);
    }

    router.replace("/dashboard");
  }, [token, name, email, googleAccessToken, router]);

  return <Loading />;
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthSuccessContent />
    </Suspense>
  );
}
