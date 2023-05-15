import React, { useContext } from "react";
import { Row, Card } from "react-bootstrap";
import { Context } from "../index";
// import { SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";
import DeviceItem from "./DeviceItem";
// import {DeviceItem} from "./DeviceItem"

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
});
export default DeviceList;
