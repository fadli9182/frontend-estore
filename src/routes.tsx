import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./layout";
import GuestGuard from "./components/auth/GuestGuard";
import AuthGuard from "./components/auth/AuthGuard";
import Loader from "./components/loader";
import { Toaster } from "./components/ui/toaster";

type TRoute = {
  exact?: boolean;
  guard?: ComponentType<{ children: React.ReactNode; role: string }>;
  layout?: ComponentType<{ children: React.ReactNode }>;
  path: string;
  element: LazyExoticComponent<ComponentType<unknown>>;
  role?: string | string[];
  routes?: TRoute[];
};

export const routes: TRoute[] = [
  {
    exact: true,
    guard: GuestGuard,
    path: "/login",
    role: "all",
    element: React.lazy(() => import("./pages/login")),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: "/register",
    role: "all",
    element: React.lazy(() => import("./pages/register")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/",
    role: "admin",
    element: React.lazy(() => import("./pages/beranda")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/change-password",
    role: "all",
    element: React.lazy(() => import("./pages/profil/UbahKataSandi")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/profile",
    role: "all",
    element: React.lazy(() => import("./pages/profil")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/supplier",
    role: "admin",
    element: React.lazy(() => import("./pages/supplier")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/user-management",
    role: "admin",
    element: React.lazy(() => import("./pages/manajeman-user/user")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/master-data/satuan-barang",
    role: "admin",
    element: React.lazy(() => import("./pages/master-data/satuan-barang")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/master-data/kategori-barang",
    role: "admin",
    element: React.lazy(() => import("./pages/master-data/kategori-barang")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/master-data/data-barang",
    role: "admin",
    element: React.lazy(() => import("./pages/master-data/data-barang")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/master-data/ruang-kerja",
    role: "admin",
    element: React.lazy(() => import("./pages/master-data/ruang-kerja")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/master-data/satuan-barang",
    role: "admin",
    element: React.lazy(() => import("./pages/master-data/satuan-barang")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/barang-masuk",
    role: "admin",
    element: React.lazy(() => import("./pages/barang-masuk")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/permintaan-barang",
    role: "admin",
    element: React.lazy(
      () => import("./pages/permintaan-barang/permintaan-barang-admin")
    ),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/permintaan-barang-user",
    role: "user",
    element: React.lazy(
      () => import("./pages/permintaan-barang/permintaan-barang-user")
    ),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/list-permintaan-barang-user",
    role: "user",
    element: React.lazy(
      () => import("./pages/permintaan-barang/daftar-permintaan-barang-user")
    ),
  },

  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/list-permintaan-barang-user-admin",
    role: "admin",
    element: React.lazy(
      () => import("./pages/permintaan-barang/permintaan-barang-user-admin")
    ),
  },

  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/keranjang-barang",
    role: "user",
    element: React.lazy(
      () =>
        import("./pages/permintaan-barang/permintaan-barang-user/CheckoutPage")
    ),
  },

  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/keranjang-barang-admin",
    role: "admin",
    element: React.lazy(
      () =>
        import(
          "./pages/permintaan-barang/permintaan-barang-user-admin/CheckoutPage"
        )
    ),
  },

  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/laporan-penerimaan",
    role: "admin",
    element: React.lazy(() => import("./pages/laporan/lap-rincian-penerimaan")),
  },
  {
    exact: true,
    layout: Layout,
    guard: AuthGuard,
    path: "/laporan-pengeluaran",
    role: "admin",
    element: React.lazy(() => import("./pages/laporan/laporan-pengeluaran")),
  },

  //Path 404
  {
    layout: Layout,
    guard: AuthGuard,
    path: "*",
    role: "all",
    element: React.lazy(() => import("./pages/not-found")),
  },
];

const renderRoutes = (routes: TRoute[] = []) => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = route.guard || React.Fragment;
          const LayoutComponent = route.layout || React.Fragment;
          const Element = route.element;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Guard role={route.role}>
                  <LayoutComponent>
                    {route.routes ? renderRoutes(route.routes) : <Element />}
                    <Toaster />
                  </LayoutComponent>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default renderRoutes;
