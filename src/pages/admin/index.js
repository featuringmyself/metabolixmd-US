
// Import your hook

import { getUser } from "@/services/Auth/cookies";
import { useRouter } from "next/router";
import {  useEffect } from "react";

const AdminLoginForm = () => {

  const loggedinUserDetail =getUser()
  const router = useRouter()

  useEffect(() => {
    if (loggedinUserDetail) {
      if (loggedinUserDetail?.__t == "Admin"){
        router.push("/admin/users")
      }
      else{
        router.push("/")
      }
    }
    else{
      router.push("/login")
    }

  }, [])

  return (
    <div>

    </div>
  );
};

export default AdminLoginForm;
