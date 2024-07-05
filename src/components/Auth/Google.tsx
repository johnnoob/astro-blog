// react
import { useState } from "react";
// react icons
import { FcGoogle } from "react-icons/fc";
import { FaRightFromBracket, FaUser } from "react-icons/fa6";
// firebase client auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/client";
// shadCN
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

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
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="hover:cursor-pointer">
            {user.picture ? (
              <img src={user.picture} className="rounded-full h-7 w-7" />
            ) : (
              <FaUser size={20} />
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <Separator />
            <button className="mx-auto w-fit flex gap-1" onClick={handleLogout}>
              <FaRightFromBracket size={20} />
              <span className="text-sm">登出</span>
            </button>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  } else {
    return (
      <Button onClick={handleLogin} variant="secondary">
        <span className="mr-1">
          <FcGoogle size={20} />
        </span>
        登入
      </Button>
    );
  }
};

export default Google;
