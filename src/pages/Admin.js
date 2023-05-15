import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Container, Button } from "react-bootstrap";
import CreatedType from "../components/Modals/CreatedType";
import CreatedDevice from "../components/Modals/CreatedDevice";
import CreatedBrand from "../components/Modals/CreatedBrand";
const Admin = () => {
//   const brandVisible = false;
//   const setBrandVisible = useState(false);
//   const typeVisible = false;
//   const setTypeVisible = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
//   const deviceVisible = false;
//   const setDeviceVisible = useState(false);
  return (
    <div>
      {/* <QRCodeSVG value="11Rizhov" />, */}
      <Container className="d-flex flex-column">
        <Button
          variant={"outline-dark"}
          className="mt-3"
          onClick={() => setTypeVisible(true)}
        >
          Добавить тип
        </Button>
        <Button
          variant={"outline-dark"}
          className="mt-3"
          onClick={() => setBrandVisible(true)}
        >
          Добавить бренд
        </Button>
        <Button
          variant={"outline-dark"}
          className="mt-3"
          onClick={() => setDeviceVisible(true)}
        >
          Добавить устройство
        </Button>
        <CreatedType show={typeVisible} onHide={() => setTypeVisible(false)} />
        <CreatedDevice
          show={deviceVisible}
          onHide={() => setDeviceVisible(false)}
        />
        <CreatedBrand
          show={brandVisible}
          onHide={() => setBrandVisible(false)}
        />
      </Container>
    </div>
  );
};

export default Admin;
