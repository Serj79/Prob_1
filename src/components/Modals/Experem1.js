import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";

const Experem1 = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const zagl = (lowStr) => {
    return lowStr[0].toUpperCase() + lowStr.slice(1);
  };

  const addType = () => {
    let sd = 0;
    let new1 = [];
    const str1 = value2;
    while (sd < value2.length) {
      // console.log("aaaa-", str1.indexOf(".", sd));
      if (str1[sd] === "." && sd !== value2.length - 1) {
        let addM = str1.substring(sd + 2, str1.indexOf(" ", sd + 2));
        const addM2 = zagl(addM);
        new1.push(addM2);
      }
      sd = sd + 1;
    }
    console.log("wwwww", new1);
    return;
  };
  const massiv = () => {
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 28 };
    let users = [vasya, petya, masha];
    
    const ms2= users.map((item)=>('Имя: '+item.name + ' возраст-'+item.age+'.'))
    alert(ms2)
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      //   aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          "Эксперементы"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Поля для эксперементов"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Form.Control>
          <Form.Control
            placeholder={"Поля 2"}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={massiv}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Experem1;
