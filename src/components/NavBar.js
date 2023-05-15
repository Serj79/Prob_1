import React, { useContext } from "react";
import { Nav, Navbar, Container,  Button } from "react-bootstrap";
import { Context } from "../index";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE,INDICATION_ROUTE,CURS_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const histori = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        <NavLink style={{ color: "white" }} to={INDICATION_ROUTE}>
          Индикация температуры
        </NavLink>
        <NavLink style={{ color: "white" }} to={CURS_ROUTE}>
          Курс
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            
            <Button
              variant={"outline-light"}
              onClick={() => histori(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => histori(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
export default NavBar;
