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
    this.Uroki = this.Uroki.bind(this);

  }
  qrGenerate(data) {
    this.setState({
      view1: true,
    });
  }
  Uroki() {
    var num = 8;
    var arr = [1, 6, 5, 2, 7, 5, 1, 4, 3, 9, 8, 11, 10, 18];

    function findCouple(array, number) {
      var result = [];
      var obj = {};
      //удаляем повторения из массива
      for (var i = 0; i < array.length; i++) {
        var str = array[i];
       
        obj[str] = true;
      }
      
      array = Object.keys(obj);
      console.error(array);
      // ищем уникальные значения
      var x = null,
        y = null;
      array.forEach(function (i, value) {
        if (number - value < number) {
          x = number - value;

          array.forEach(function (j, value2) {
            if (x == value2 && j > i) {
              y = value;

              result.push("Ваша пара чисел: " + y + " + " + x);
            }
          });
        }
      });
      return result;
    }

    document.writeln(findCouple(arr, num));
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
          {view1 ? (
            <QRCodeSVG
              className="d-flex justify-content-center mt-5 mr-5"
              value={qrGenVal}
            />
          ) : (
            ""
          )}
        </Card>
       
            <Button
              variant={"outline-success"}
              className="mt-3 align-content-end"
              onClick={this.Uroki}
            >
              Уроки
            </Button>
        
      </div>
    );
  }
}

export default QrCode;
