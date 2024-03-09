import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CustomLoader from "./CustomLoader";
import AuthProvider from "../routes/AuthProvider";

const Layout = (): JSX.Element => {
  return (
    <AuthProvider>
      <Suspense fallback={<CustomLoader />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default Layout;
