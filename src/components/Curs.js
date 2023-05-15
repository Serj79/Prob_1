import React, { useState, useContext, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import { Context } from "../index";
import DataTable from "react-data-table-component";
import { createIndication, fetchIndication } from "../http/tempAPI";
//  import { SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";

import moment from "moment";

const Curs = observer(() => {
  const { device } = useContext(Context);
  const [date, setdate] = useState();
  const [temp, settemp] = useState();
  const [info, setInfo] = useState([]);

  let dat_temp = [];
  let cursIn = [];
  const handleSave = () => {
    console.log("ffffffff", info);
    const myDoc = JSON.stringify(info);
    const fileName = "my-document.txt";
    const file = new Blob([myDoc], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

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
  const exampleFile = async (e) => {
    e.preventDefault();
    const exampleFileReader = new FileReader();
    // exampleFileReader.onload = async (e) => {
    //   const text = (e.target.result)
    //   console.log(text)
    //   alert(text)
    // };
    let cursIn = [];
    exampleFileReader.readAsText(e.target.files[0]);
    exampleFileReader.onload = function () {
      let lines = exampleFileReader.result.split("\n");
      // let linNumb = [];
      lines.forEach(function (item, index, line) {
        console.log("----", index);
        //  cursIn[index].push(index);
        if (index > 1) {
          let linNumb = [];
          linNumb.push(item.split(","));
          cursIn.push(linNumb[0]);
          // alert(line)
          console.log(linNumb[0]);
        }

        // здесь можно добавить код для обработки каждой строки
      });
      cursIn.reverse();
      // заполнение дельт 
      let delt4 = [];
      for (let i = 1; i < 4; i++) {
        // выведет 0, затем 1, затем 2
        const dSvech = Number(cursIn[i][4]) - Number(cursIn[i][7]); // дельта открытия и закрытия
        const dOtkrMax = Number(cursIn[i][5]) - Number(cursIn[i][4]); // дельта максимума и открытия
        const dZakMax = Number(cursIn[i][5]) - Number(cursIn[i][7]); // дельта максимума и закрытия
        const dMinMax = Number(cursIn[i][5]) - Number(cursIn[i][6]); // дельта максимума и минимума
        delt4.push([
          dSvech,
          dOtkrMax,
          dZakMax,
          dMinMax,
          Number(cursIn[i][8].slice(0, -1)),
        ]);
        console.log("******rrrr*******", delt4);
      }
      // Анализ по дельтам
      let final = 0;
      let Itogi = [];
      let result = []; // массив для таблицы
      cursIn.forEach(function (item, index, line) {
        // console.log("+++++", index, cursIn[index + 1]);
        //  cursIn[index].push(index);
        if (index > 1 && index < cursIn.length - 2) {
          const dSvech1 = Number(item[4] - item[7]); // дельта открытия и закрытия
          const dOtkrMax1 = Number(item[5] - item[4]); // дельта максимума и открытия
          const dZakMax1 = Number(item[5] - item[7]); // дельта максимума и закрытия
          const dMinMax1 = Number(item[5] - item[6]); // дельта максимума и минимума

          const dSvech2 =
            Number(cursIn[index + 1][4]) - Number(cursIn[index + 1][7]); // дельта открытия и закрытия
          const dOtkrMax2 =
            Number(cursIn[index + 1][5]) - Number(cursIn[index + 1][4]); // дельта максимума и открытия
          const dZakMax2 =
            Number(cursIn[index + 1][5]) - Number(cursIn[index + 1][7]); // дельта максимума и закрытия
          const dMinMax2 =
            Number(cursIn[index + 1][5]) - Number(cursIn[index + 1][6]); // дельта максимума и минимума

          const dSvech3 =
            Number(cursIn[index + 2][4]) - Number(cursIn[index + 2][7]); // дельта открытия и закрытия
          const dOtkrMax3 =
            Number(cursIn[index + 2][5]) - Number(cursIn[index + 2][4]); // дельта максимума и открытия
          const dZakMax3 =
            Number(cursIn[index + 2][5]) - Number(cursIn[index + 2][7]); // дельта максимума и закрытия
          const dMinMax3 =
            Number(cursIn[index + 2][5]) - Number(cursIn[index + 2][6]); // дельта максимума и минимума
          // сравниваем дельты с эталонным массивом в случае если все разница < допуска то заносим в массив Itogi
          const dopustOtkl1 = 0.4; // допуск отклонений
          if (
            Math.abs(dSvech1 - delt4[0][0]) < dopustOtkl1 &&
             Math.abs(dOtkrMax1 - delt4[0][1]) < dopustOtkl1 &&
            // Math.abs(dZakMax1 - delt4[0][2]) < dopustOtkl1 &&
            // Math.abs(dMinMax1 - delt4[0][3]) < dopustOtkl1 

            Math.abs(dSvech2 - delt4[1][0]) < dopustOtkl1 &&
             Math.abs(dOtkrMax2 - delt4[1][1]) < dopustOtkl1 
            // Math.abs(dZakMax2 - delt4[1][2]) < dopustOtkl1 &&
            // Math.abs(dMinMax2 - delt4[1][3]) < dopustOtkl1 

            //  Math.abs(dSvech3 - delt4[2][0]) < dopustOtkl1 
            // Math.abs(dOtkrMax3 - delt4[2][1]) < dopustOtkl1 &&
            // Math.abs(dZakMax3 - delt4[2][2]) < dopustOtkl1 &&
            // Math.abs(dMinMax3 - delt4[2][3]) < dopustOtkl1
          ) {
            item[8]=item[8].slice(0, -1)
            item.push( Number(cursIn[index -1][5]-Number(item[5]) ))// вычислим разность значений между HIGH текущего дня и следующего!!!!!
            Itogi.push(item);
            final = final + 1;
          }
        }
        // преобразуем массив итоги в удобный для таблицы
        //<TICKER>,<PER>,<DATE>,<TIME>,<OPEN>,<HIGH>,<LOW>,<CLOSE>,<VOL></VOL>
        result = Itogi.map((innerArr) => {
          let obj = {};
          obj.TICKER = innerArr[0];
          obj.PER = innerArr[1];
          obj.DATE = innerArr[2];
          obj.TIME = innerArr[3];
          obj.OPEN = innerArr[4];
          obj.HIGH = innerArr[5];
          obj.LOW = innerArr[6];
          obj.CLOSE = innerArr[7];
          obj.VOL = innerArr[8];
          obj.PREDSK = innerArr[9]; // разница между следуещем Хай и текущим
          // return JSON.stringify(obj);
          return obj;
        });

        // здесь можно добавить код для обработки каждой строки
      });
      console.log("final!!!!!!!!!!!!-", result);
      setInfo(result);
    };
  };

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
  //<TICKER>,<PER>,<DATE>,<TIME>,<OPEN>,<HIGH>,<LOW>,<CLOSE>,<VOL></VOL>
  const columns = [
    {
      name: "DATE",
      selector: (row) => row.DATE,
      sortable: true,
    },
    {
      name: "OPEN",
      selector: (row) => row.OPEN,
      sortable: true,
    },
    {
      name: "HIGH",
      selector: (row) => row.HIGH,
      sortable: true,
    },
    {
      name: "LOW",
      selector: (row) => row.LOW,
      sortable: true,
    },

    {
      name: "CLOSE",
      selector: (row) => row.CLOSE,
      sortable: true,
    },
    {
      name: "PREDSK",
      selector: (row) => row.PREDSK,
      sortable: true,
    },
    {
      name: "VOL",
      selector: (row) => row.VOL,
      sortable: true,
    },
  ];

  return (
    <div>
      <Card style={{ width: 600 }} className="p-3">
        <Form className="d-flex flex-column"></Form>

        <h1>Анализ курсов </h1>
        <input type="file" onChange={(e) => exampleFile(e)} />
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
            Прочитать
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
export default Curs;
