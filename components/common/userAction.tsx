import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const UserAction = async () => {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
        <div className="flex gap-2">
          <Link className="hover:underline" href="sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>

          <Link className="hover:underline" href="sign-up">
            <Button className="bg-neutral text-white">Create Account</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAction;
