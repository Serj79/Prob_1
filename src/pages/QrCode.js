import React, { Component } from "react";
import { QrReader } from "react-qr-reader";
import { QRCodeSVG } from "qrcode.react";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
// import { useRoutes } from "react-router-dom";

class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view1: false,
      qrGenVal: "",
      delay: 600,
      result: "No result",
    };
    this.handleScan = this.handleScan.bind(this);
    this.qrGenerate = this.qrGenerate.bind(this);
  }
  qrGenerate(data) {
    this.setState({
      view1: true,
    });
  }
  handleScan(data) {
    // console.log(data)
    // const history = useRoutes();
    if (data) {
      this.setState({
        result: data.text,
      });
      alert(data.text);
      //  history.push('/curs')
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const { qrGenVal, view1 } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            overflowX: "auto",
            height: "600px",
            width: "600px",
            border: "1px solid black",
          }}
        >
          <QrReader
            scanDelay={this.state.delay}
            onError={this.handleError}
            // onScan={this.handleScan}
            onResult={(result, error) => {
              if (!!result) {
                this.handleScan(result);
                // console.log(result)
              }

              if (!!error) {
                console.info("111", error);
              }
            }}
            videoStyle={{ height: "400px", width: "400px" }}
          />

          {/* document.getElementById('mountNode')   */}
          <p>{this.state.result}</p>
        </div>

        <Card style={{ width: 600 }} className="p-3">
          <Form className="d-flex flex-column "></Form>

          <Form.Control
            className="mt-3"
            placeholder="Введите строку...."
            value={qrGenVal}
            onChange={(e) => {
              this.setState({ qrGenVal: e.target.value, view1: false });
            }}
            // type="password"
          ></Form.Control>
          <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
            <Button
              variant={"outline-success"}
              className="mt-3 align-content-end"
              onClick={this.qrGenerate}
            >
              Отобразить QrCode
            </Button>
          </Row>
          {view1 ? <QRCodeSVG className="d-flex justify-content-center mt-5 mr-5" value={qrGenVal} /> : ""}
        </Card>
      </div>
    );
  }
}

export default QrCode;
