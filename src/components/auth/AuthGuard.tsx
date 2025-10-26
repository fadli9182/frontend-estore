import React, { useEffect, ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../../hooks/useAuth";
import RolesGuard from "./RolesGuard";
import { getLocalStorage } from "@/services/localStorageService";

const AuthGuard = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const { isLoggedIn } = useAuth();

  const userData = getLocalStorage("userData");

  const navigate = useNavigate();

  const location = window.location.pathname;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (location === "/" && userData?.role === "user") {
    return <Navigate to="/permintaan-barang-user" replace />;
  }

  if (RolesGuard({ role })) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return <Navigate to="/404" replace />;
  }
};

export default AuthGuard;

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
