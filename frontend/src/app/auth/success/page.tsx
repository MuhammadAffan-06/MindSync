"use client";
import { Suspense, useEffect } from "react";
import Loading from "@/app/components/loading/loading";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (!token || !name || !email) {
      router.replace("/auth");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    router.replace("/dashboard");
  }, [token, name, email, router]);

  return <Loading />;
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthSuccessContent />
    </Suspense>
  );
}
