import React, { useContext } from "react";
import { Row, Card } from "react-bootstrap";
import { Context } from "../index";
//  import { SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";

const BrandBare = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex flex-row mt-3">
      <div className="mt-1 d-flex flex-row justify-content-between">
        {device.brands.map((brand) => (
          <Card
            key={brand.id}
            className="p-3 "
            style={{ cursor: "pointer" }}
            border={brand.id === device.selectedBrand.id ? "danger" : "lite"}
            onClick={() => device.setSelectedBrand(brand)}
          >
            <h5>{brand.name}</h5>
          </Card>
        ))}
      </div>
    </Row>
  );
});
export default BrandBare;
