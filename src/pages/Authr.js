import React, { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import {
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { login, registrations } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Authr = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  // console.log("location33", location, isLogin, SHOP_ROUTE);

  const click = async () => {
    try {
      let data;
      
      if (isLogin) {
        console.log("sssss", location, isLogin, SHOP_ROUTE);
        data = await login(email, password);
      } else {
        console.log("tttttt", location, isLogin, SHOP_ROUTE);
        data = await registrations(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      //  console.log("55555555555",data)
      history(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-3">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column"></Form>
        <Form.Control
          className="mt-3"
          placeholder="Введите email...."
          value={email}
          onChange={(e) => setemail(e.target.value)}
        ></Form.Control>
        <Form.Control
          className="mt-3"
          placeholder="Введите пароль...."
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
        ></Form.Control>
        <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
          {isLogin ? (
            <div>
              Нет акаунта?
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
            </div>
          ) : (
            <div>
              Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
            </div>
          )}
          <Button
            variant={"outline-success"}
            className="mt-3 align-content-end"
            onClick={click}
          >
            {isLogin ? "Войти" : "Регистрация"}
          </Button>
        </Row>
      </Card>
    </Container>
  );
});

export default Authr;
