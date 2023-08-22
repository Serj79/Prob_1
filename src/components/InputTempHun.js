import React, { useState, useContext, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import { Context } from "../index";
import DataTable from "react-data-table-component";
import { createIndication, fetchIndication } from "../http/tempAPI";
//  import { SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";
import QrReader from "react-qr-reader";

import moment from "moment";

const InputTempHun = observer(() => {
  const { device } = useContext(Context);
  const [date, setdate] = useState();
  const [temp, settemp] = useState();
  const [info, setInfo] = useState([]);

  let dat_temp = [];

  const handleSave = () => {
    // const blob = new Blob([this.pdfDocument], { type: 'application/pdf' });
    // const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');
    console.log("ffffffff", info);
    const myDoc =  JSON.stringify(info);;
    const fileName = "my-document.txt";
    const file = new Blob([myDoc], {type: 'text/plain'});
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  const handlePrint = () => {
    window.print();
  }


  useEffect(() => {
    fetchIndication().then((data) => {
      console.log("xxxxx", data);
      dat_temp = data;
      console.log("yyyyyy", dat_temp);
      setInfo(dat_temp);
      return device.setTemer(data);
    });
  }, []);
  // const addInfo = () => {
  //   setInfo([...info, { title: "", description: "", number: Date.now() }]);
  // };
  // const changeInfo = (key, value, number) => {
  //   setInfo(
  //     info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
  //   );
  // };
  //  device.temer.map((device)=>console.log('1*---**--*-*-*',device.temer))
  // console.log('1*---**--*-*-*',device.temer)
  const click = async () => {
    try {
      let data;
      console.log("tttttt");
      const dat_n = new Date(date).toISOString();
      const time_1 = moment(dat_n).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const time = moment(time_1).set("hour", 13);
      data = await createIndication(time, temp);
      // history(SHOP_ROUTE);moment(date).format('DD.MM.yyyy')
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const columns = [
    {
      name: "data_1",
      selector: (row) => row.indicat_temp,
      sortable: true,
    },
    {
      name: "Temp",
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  return (
    <div>
      <Card style={{ width: 600 }} className="p-3">
        <Form className="d-flex flex-column"></Form>
        <Form.Control
          className="mt-3"
          placeholder="Введите дату...."
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        ></Form.Control>
        <Form.Control
          className="mt-3"
          placeholder="Введите показания...."
          value={temp}
          onChange={(e) => settemp(e.target.value)}
          // type="password"
        ></Form.Control>
        <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
          <Button
            variant={"outline-success"}
            className="mt-3 align-content-end"
            onClick={click}
          >
            Записать
          </Button>
        </Row>
      </Card>
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={handlePrint}>Распечатать</button>
      
      <DataTable
        columns={columns}
        data={info}
        selectableRows
        pagination
        striped
        highlightOnHover
      />
    </div>
  );
});
export default InputTempHun;
