import { getLocalStorage } from "@/services/localStorageService";

const RolesGuard = ({ role }) => {
  // const roleLogin = getLocalStorage("userData")?.role_id;
  // const roleLogin = 1;
  const userData = getLocalStorage("userData");
  const roleLogin = userData?.role;
  // const dataUser = getLocalStorage("userData").data_user;

  const isRoleHasAccess = (role) => {
    switch (role) {
      case "admin":
        if (roleLogin === "admin") {
          return true;
        } else {
          return false;
        }
      case "user":
        if (roleLogin === "user") {
          return true;
        } else {
          return false;
        }
      case "all":
        return true;
      default:
        return false;
    }
  };

  // handle role yang berupa array
  if (Array.isArray(role)) {
    return role.some(isRoleHasAccess);
  }

  // handle role yang berupa string
  return isRoleHasAccess(role);
};

export default RolesGuard;
