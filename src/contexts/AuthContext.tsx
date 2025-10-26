import { createContext, useEffect, useReducer, ReactNode } from "react";
import accountReducer from "../store/accountReducer";
import {
  ACCOUNT_INITIALISE,
  IS_LOADING,
  LOGIN,
  LOGOUT,
} from "../store/actions";
import { axiosServices } from "@/services/axios";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/services/localStorageService";
import { useTheme } from "@/components/theme-provider";
import { toast } from "@/components/ui/use-toast";

type TData = {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  name?: string;
  token?: string;
  token_expire?: string;
};

type TAuthContext = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isInitialised: boolean;
  user: TData | null;
  login: (username: string, password: string) => Promise<false | undefined>;
  logout: () => void;
};

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isInitialised: false,
  user: null,
};

const AuthContext = createContext<TAuthContext>({
  ...initialState,
  login: async () => false,
  logout: () => {},
});

const verifyToken = (serviceToken: any): boolean => {
  if (!serviceToken) {
    return false;
  } else {
    return true;
  }
};

const setSession = (data: any) => {
  if (data) {
    setLocalStorage("userData", data);
    axiosServices().defaults.headers.common["Authorization"] = data.token;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const { setTheme } = useTheme();

  const login = async (username: string, password: string) => {
    dispatch({
      type: IS_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await axiosServices().post(`/api/auth/login`, {
        username,
        password,
      });
      const data = response.data.data;
      const token = response.data.token;

      setSession({ ...data, token });
      dispatch({
        type: LOGIN,
        payload: {
          user: data,
          isLoggedIn: true,
        },
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Gagal Login",
        description: err?.response?.data?.message || "Login gagal",
      });
    }
    dispatch({
      type: IS_LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const logout = () => {
    setSession({});
    localStorage.removeItem("userData");
    setTheme("light");
    dispatch({
      type: LOGOUT,
      payload: {
        isLoggedIn: false,
        user: null,
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      const userData = localStorage.getItem("userData");

      try {
        const serviceToken = getLocalStorage("userData")?.token;

        if (verifyToken(serviceToken)) {
          const user = userData ? JSON.parse(userData).user : null;
          setSession(user);
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ACCOUNT_INITIALISE,
          payload: {
            isLoggedIn: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
