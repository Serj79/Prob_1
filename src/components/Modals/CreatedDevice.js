import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Modal, Dropdown, Col, Row } from "react-bootstrap";
import { Context } from "../../index";
import { fetchType, fetchBrands, createDevices } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreatedDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchType().then((data) => device.setType(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const addDevice = () => {
    const formData = new FormData()
    formData.append ('name',name)
    formData.append ('price',`${price}`)
    formData.append ('img',file)
    formData.append ('typeId',device.selectedType.id)
    formData.append ('brandId',device.selectedBrand.id)
    formData.append ('info',JSON.stringify(info))
    createDevices(formData).then((data)=>{onHide()})
  };
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
console.log('device.type',device.type)
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
          Новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 md-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.type.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 md-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          ></Form.Control>
          <Form.Control
            value={price}
            onChange={(e) => Number(setPrice(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость"
            type="number"
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="Введите картинку"
            type="file"
            onChange={selectFile}
          ></Form.Control>
          <hr />
          <Button variant={"outline-black"} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange = {(e)=>changeInfo('title',e.target.value,i.number)}
                  placeholder="Введите название характеристики"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange = {(e)=>changeInfo('description',e.target.value,i.number)}
                  placeholder="Введите описание характеристики"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-red"}
                  onClick={() => {
                    removeInfo(i.number);
                  }}
                >
                  {" "}
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default CreatedDevice;
