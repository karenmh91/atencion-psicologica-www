'use client'

import { getToken } from "@/services/auth.service";
import { log } from "console";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function AuthGuard({ children }: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const path = usePathname()
  const searchParams = useSearchParams()

  const authCheck = useCallback((url: string) => { 
    const path = url.split('?')[0]; 
     
    setAuthorized(true);  
  }, [router])

  useEffect(() => {
    authCheck(path);
  }, [path, searchParams, authCheck]);

  return (authorized && children);
}