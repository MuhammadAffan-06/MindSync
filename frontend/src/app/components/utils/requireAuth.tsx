"use client";  

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { fetchData } from "./api";

// `Component` was spelled incorrectly before. Fix that.
export function RequireAuth(Component: React.FC) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
      if(isAuthenticated) return;

      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth");
      } else {
        (async()=>{
          try{
            await fetchData("auth/verify","GET");
            setIsAuthenticated(true);
          }catch{
            localStorage.clear();

            router.replace("/auth");

          }

      
       })()
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (<Loading  message={"Validating..."}/>);
    }
  
    return <Component {...props} />;
  };
}
