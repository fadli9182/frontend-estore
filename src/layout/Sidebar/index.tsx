import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AiOutlineRight } from "react-icons/ai";

import { menuItems } from "../../utils/menuItems";
import { ConfigContext } from "../../contexts/configContext";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getLocalStorage } from "@/services/localStorageService";

const Sidebar = () => {
  const { state } = useContext(ConfigContext);

  const [expandedChildId, setExpandedChildId] = useState(
    localStorage.getItem("expandedChildId") || null
  );

  const wrapperClass = classNames(
    "px-1 py-4 fixed h-[calc(100dvh-100px)] z-[9999] scroll__primary shadow-xl w-[220px] md:w-[260px] fixed top-[72px] bg-background transition-all duration-300 ease-in-out m-3 bg-white rounded-xl",
    {
      "left-0": !state.isSidebarOpen,
      "left-[-300px]": state.isSidebarOpen,
    }
  );
  const navBarClass = classNames(
    "w-full flex flex-row items-center gap-3 cursor-pointer hover:bg-[#E3F2FD] hover:text-[#1976D2] hover:font-semibold rounded-lg drop-shadow",
    {
      "justify-center": state.isSidebarOpen,
      "": !state.isSidebarOpen,
    }
  );

  const handleCollapseChild = (id: string) => {
    // Toggle the expanded item based on its ID
    localStorage.setItem("expandedChildId", id);
    setExpandedChildId((prevId) => (prevId === id ? null : id));
  };

  const pathName = useLocation().pathname;

  const userData = getLocalStorage("userData");
  const userRole = userData?.role;

  // const roleLogin = 1;

  // const whatRole = () => {
  //   switch (roleLogin) {
  //     case 1:
  //       return "admin";
  //     case 2:
  //       return "ppkd";
  //     case 3:
  //       return "opd";
  //     case 4:
  //       return "bendahara";
  //     default:
  //       return "all";
  //   }
  // };

  // // role menu item yang akan ditampilkan
  // const role = whatRole();

  // filter menu item berdasarkan role
  const itemsMenu = menuItems.filter(
    (item) => item.role.includes(userRole) || item.role === "all"
  );

  return (
    <nav className={wrapperClass}>
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col items-start gap-2 mx-2 text-accent-foreground font-semibold">
          {itemsMenu.map((item) => {
            return (
              <React.Fragment key={item.name}>
                {!item.children ? (
                  <NavLink
                    to={item.link}
                    onClick={() => {
                      localStorage.setItem("expandedChildId", "");
                      setExpandedChildId(null);
                    }}
                    // className={`${navBarClass}`}
                    className={({ isActive }) =>
                      `${navBarClass} px-4 py-4 text-sm ${
                        isActive ? "bg-[#E3F2FD] text-primary drop-shadow" : ""
                      }`.trim()
                    }
                  >
                    <img src={item.icon} width={18} height={18} alt="icon" />
                    {!state.isSidebarOpen && (
                      <h5 className="text-xs">{item.name}</h5>
                    )}
                  </NavLink>
                ) : (
                  <div
                    className={`${navBarClass} px-4 py-4 text-sm ${
                      !state.isSidebarOpen ? "justify-between" : ""
                    } ${
                      expandedChildId === item.id
                        ? "bg-[#E3F2FD] text-primary drop-shadow"
                        : ""
                    }`}
                    key={item.name}
                    onClick={() => handleCollapseChild(item.id)}
                  >
                    <div className="flex gap-3">
                      <img src={item.icon} width={18} height={18} alt="icon" />
                      {!state.isSidebarOpen && (
                        <h5 className="text-xs">{item.name}</h5>
                      )}
                    </div>
                    {!state.isSidebarOpen &&
                      (expandedChildId === item.id ? (
                        <AiOutlineRight className="text-sm rotate-90 transition-all duration-500 ease-in-out" />
                      ) : (
                        <AiOutlineRight className="text-sm transition-all duration-500 ease-in-out" />
                      ))}
                  </div>
                )}
                {item.children && (
                  <motion.ul
                    animate={
                      !state.isSidebarOpen && expandedChildId === item.id
                        ? {
                            height: "fit-content",
                          }
                        : {
                            height: 0,
                          }
                    }
                    className={`ps-6 px-5 w-full overflow-hidden`}
                  >
                    {item.children
                      .filter((child) => child.role.includes(userRole))
                      .map((child) => {
                        return (
                          <li
                            key={child.name}
                            className={`flex items-center gap-2 ${
                              pathName === child.link
                                ? "bg-[aliceblue] text-primary rounded"
                                : ""
                            }`}
                          >
                            <ChevronRight size={16} />
                            <NavLink
                              to={child.link}
                              className={({ isActive }) =>
                                `w-full flex items-center gap-3 py-2 cursor-pointer text-xs hover:text-primary ${
                                  isActive ? "font-semibold text-primary" : ""
                                }`.trim()
                              }
                            >
                              {child.name}
                            </NavLink>
                          </li>
                        );
                      })}
                  </motion.ul>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
