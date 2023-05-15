import React, { useEffect, useState } from "react";
import TypeBar from "../components/TypeBar";
import { Col, Image, Container, Row, Card, Button } from "react-bootstrap";
import bigStar from "../assert/bigStar.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
const DevicePages = () => {
  
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
  }, [])


  console.log("devvvv",device)
  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image width={300} heigth={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row>
            <h2>{device.name}</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 260,
                height: 260,
                backgroundSize: "cover",
                fontSize: 64,
              }}
              // style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 52,
              border: "5px solid lightgrey",
            }}
          >
            <h3>От {device.price}</h3>
            <Button variant={"outline-dark"}>Добавить в карзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className=" d-flex flex-column m-5">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transpare",
              padding: "10px",
            }}
          >
            {info.title} : {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePages;
