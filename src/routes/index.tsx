import React, { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { App, Login, Post } from "../componenets";
import { PrivateRoute, PublicRoute } from "./helper";

let index: RouteObject[] = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/post:id",
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
  },
];

/**
 * application router
 * @returns {JSX.Element}
 * @constructor
 */
const AppRouter: FC = () => {
  let element = useRoutes(index);

  return <Suspense fallback={<></>}>{element}</Suspense>;
};

export default AppRouter;
