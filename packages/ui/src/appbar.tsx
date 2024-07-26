"use client";

import React from "react";
import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignIn: () => {};
  onSignOut: () => {};
}

export const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <Button
          onClick={user ? onSignOut : onSignIn}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
