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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
            {user.picture ? (
              <img src={user.picture} className="rounded-full h-7 w-7" />
            ) : (
              <FaUser size={20} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              {user.name}
              <span className="text-muted-foreground font-normal">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              className="w-fit mx-auto flex gap-2 items-center py-1"
              onClick={handleLogout}
            >
              <FaRightFromBracket size={15} />
              <span className="text-sm">登出</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Button onClick={handleLogin} variant="ghost">
        <span className="mr-1">
          <FcGoogle size={20} />
        </span>
        登入
      </Button>
    );
  }
};

export default Google;
