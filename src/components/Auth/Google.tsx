// react
import { useState } from "react";
// firebase client auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/client";
// shadCN
import { Button } from "../ui/button";

const Google = () => {
  const handleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const userCrendential = await signInWithPopup(auth, provider);
    const idToken = await userCrendential.user.getIdToken();
    const response = await fetch("/api/auth/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (response.redirected) {
      window.location.assign(response.url);
    }
  };
  const handleLogout = async () => {
    await fetch("/api/auth/logout");
  };
  return <Button onClick={handleLogin}>登入</Button>;
};

export default Google;
