import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const UserAction = async () => {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
        <div className="flex gap-2">
          <Link className="hover:underline" href="sign-in">
            Login
          </Link>
          {"/"}
          <Link className="hover:underline" href="sign-up">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAction;
