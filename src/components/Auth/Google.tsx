// react
import { useState } from "react";
// firebase client auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/client";
// shadCN
import { Button } from "../ui/button";

type User = {
  id: string;
  name: string;
  picture: string | undefined;
  email: string | undefined;
};

type Props = {
  user: User | undefined;
};

const Google = ({ user }: Props) => {
  console.log(user);

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
    window.location.reload();
  };
  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    window.location.reload();
  };
  if (user) {
    return (
      <Button onClick={handleLogout} variant="ghost">
        {user.picture && (
          <img src={user.picture} className="rounded-full h-9 w-9" />
        )}
      </Button>
    );
  } else {
    return <Button onClick={handleLogin}>登入</Button>;
  }
};

export default Google;
