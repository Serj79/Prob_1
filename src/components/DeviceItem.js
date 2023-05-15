import React, { useContext } from "react";
import { Row, Card, Col, Image } from "react-bootstrap";
import { Context } from "../index";
import { DEVICE_ROUTE } from "../utils/constants";
// import { observer } from "mobx-react-lite";
import star from "../assert/star.png";
import { useNavigate } from "react-router-dom";

const DeviceItem = ({ device }) => {
  const histori = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => histori(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"lite"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="mt-1 text-black-50 d-flex align-items-center justify-content-between">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image src={star} width={20} height={20} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};
export default DeviceItem;
