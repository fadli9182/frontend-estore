import { BrowserRouter as Router } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import renderRoutes, { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  getLocalStorage,
  removeLocalStorage,
} from "./services/localStorageService";
import { isEmptyV2 } from "./utils/utils";
import { IdleTimerProvider } from "react-idle-timer";

function App() {
  const queryClient = new QueryClient();

  const userData = getLocalStorage("userData");

  const onIdleLogout = () => {
    if (isEmptyV2(userData)) return;

    removeLocalStorage("userData");
    window.location.href = "/login";
  };

  const LOGOUT_IDLE_TIME = 1000 * 60 * 20;

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <IdleTimerProvider timeout={LOGOUT_IDLE_TIME} onIdle={onIdleLogout}>
            <AuthContextProvider>{renderRoutes(routes)}</AuthContextProvider>
          </IdleTimerProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
