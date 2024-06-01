import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const UserAction = async () => {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <UserButton />
      ) : (
        <div>
          <Link href="sign-in">Login</Link>
          {"/"}
          <Link href="sign-up">Register</Link>
        </div>
      )}
    </div>
  );
};

export default UserAction;
