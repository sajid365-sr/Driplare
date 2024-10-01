import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme.toggle";

const UserAction = async () => {
  const user = await currentUser();

  return (
    <div className="flex justify-center items-center gap-3 ">
      {user ? (
        <div>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      ) : (
        <div className=" gap-2 hidden md:flex">
          <Link href="sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>

          <Link href="sign-up">
            <Button className="bg-primary font-semibold">Create Account</Button>
          </Link>
        </div>
      )}

      <ThemeToggle />
    </div>
  );
};

export default UserAction;
