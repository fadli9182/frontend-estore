import React from "react";
import { useContext } from "react";
import classNames from "classnames";

import { ConfigContext } from "../contexts/configContext";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TLayoutProps> = ({ children }) => {
  // const [eventData, setEventData] = useState({ width: 0, height: 0 });
  const { state, dispatch } = useContext(ConfigContext);

  const homeWrapperClass = classNames(
    "flex flex-col overflow-hidden transition-all duration-300 ease-linear",
    {
      "ml-0 md:ml-[280px]": !state.isSidebarOpen,
      "m-0": state.isSidebarOpen,
      //   "bg-tertiary": state.theme === "light",
      //   "bg-secondary text-white  ": state.theme === "dark",
    }
  );

  const navHeaderClass = classNames(
    "p-4 flex flex-row items-center justify-between shadow-lg z-50 bg-primary w-full h-[72px] fixed top-0 transition-all duration-300 ease-in-out"
  );

  const handleCollapse = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
    dispatch({ type: "TOGGLE_MOUSE_ACTIVE" });
    // setIsMouseActive(!toggleCollapse);
  };

  // const [bindWindowResizeListener, unbindWindowResizeListener] =
  //   useResizeListener({
  //     listener: (event) => {
  //       setEventData({
  //         width: event.currentTarget.innerWidth,
  //         height: event.currentTarget.innerHeight,
  //       });
  //     },
  //   });

  // useEffect(() => {
  //   setEventData({ width: window.innerWidth, height: window.innerHeight });
  // }, []);

  // useEffect(() => {
  //   bindWindowResizeListener();

  //   return () => {
  //     unbindWindowResizeListener();
  //   };
  // }, [bindWindowResizeListener, unbindWindowResizeListener]);

  return (
    <main className="bg-slate-200">
      <Sidebar />
      <div className={navHeaderClass}>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex align-items-center justify-content-between">
            {/* <h1 className="text-3xl font-serif text-white">Logo</h1> */}
            <Link to="/">
              <div className="flex gap-3 justify-center items-center">
                <div className="p-[1px] bg-white ">
                  <img src="/images/favicon.ico" alt="" width={40} />
                </div>
                <p className="text-white text-xl font-sans drop-shadow-xl">
                  EStore
                </p>
              </div>
            </Link>
          </div>
          <img
            className="cursor-pointer"
            onClick={handleCollapse}
            src={
              state.isSidebarOpen
                ? "/images/menu/IconMenuOpen.svg"
                : "/images/menu/IconMenuClose.svg"
            }
            width={32}
            height={32}
            alt="icon toggle out"
          />
        </div>
        {/* <ButtonTheme /> */}
        {/* User menu */}
        <UserMenu />
      </div>
      <div className={homeWrapperClass}>
        <div
          className="pt-[90px] p-2 relative h-[100dvh] overflow-auto"
          onClick={() => {
            if (!state.isSidebarOpen) dispatch({ type: "TOGGLE_SIDEBAR" });
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
