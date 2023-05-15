import React, { useContext } from "react";

import { Routes, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Admin from "../pages/Admin";
import Shop from "../pages/Shop";
import { SHOP_ROUTE } from "../utils/constants";
import { Context } from "../index";

const AppRouter = () => {
  //  const isAuth = true;
  const { user } = useContext(Context);
  console.log("**-*-*-*", authRoutes, user);
  return (
    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, Element }) => {
          return <Route key={path} path={path} element={Element} exact />;
        })}
      {publicRoutes.map(({ path, Element }) => {
        console.log('eeeee',path)
        return <Route key={path} path={path} element={Element} exact />;
      })}
      <Route path="*" element={<Shop />} />
    </Routes>
  );
};

export default AppRouter;
