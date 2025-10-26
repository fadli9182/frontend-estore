import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;

GuestGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
