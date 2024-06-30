import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-indigo-500">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
