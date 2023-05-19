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
 
 // пример поиска по матрице
  const matrtest = [
    [1, 4, 7, 11, 15, 17],
    [2, 5, 8, 12, 19, 22],
    [3, 6, 9, 16, 22, 24],
    [10, 13, 14, 17, 24, 27],
    [18, 21, 23, 26, 30, 36],
  ];
  const k = Number (temp);
  const matrObh = () => {
    const m = matrtest.length; //  кол строк
    const n = matrtest[0].length; //кол столюцов
    let i = 0;
    let j = n - 1;
    console.log("--**-*-*", k, m, n);

    while (i < m && j > 0) {
      console.log("&&&&&&&", k, i, j);
      if (matrtest[i][j] === k) {
        alert("Нашлось - " + "ячейка -" + (i+1) + "-" + (j+1));
        return;
      }

      if (matrtest[i][j] > k) {
        // т.к. матрица упорядочена по возрастанию и проход начинается с правого верхнего угла
        j = j - 1; // сдвинем на стобец влево
      } else {
        i = i + 1; // сдвинем на строку вниз
      }
    }
    alert("Ничего не нашлось");
  };
  const JsonTree={
    "id": 1,
    "value": 5,
    "left": {
      "id": 2,
      "value": 3,
      "left": {
        "id": 4,
        "value": 7
      },
      "right": {
        "id": 5,
        "value": 1
      }
    },
    "right": {
      "id": 3,
      "value": 8,
      "left": {
        "id": 6,
        "value": 2
      },
      "right": {
        "id": 7,
        "value": 4,
        "left": {
          "id": 8,
          "value": 6
        },
        "right": {
          "id": 9,
          "value": 9
        }
      }
    }
  }
  // пример обхода дерева и выбор оптимальной суммы

  const JsonTree2=
    [
      {
        "id": 1,
        "value": 5,
        "childrenLeft": 2,
        "childrenRight": 3
      },
      {
        "id": 2,
        "value": 3,
        "childrenLeft": 4,
        "childrenRight": 5
      },
      {
        "id": 3,
        "value": 8,
        "childrenLeft": 6,
        "childrenRight": 7
      },
      {
        "id": 4,
        "value": 7,
        "childrenLeft": null,
        "childrenRight": null
      },
      {
        "id": 5,
        "value": 1,
        "childrenLeft": null,
        "childrenRight": null
      }, 
       {
        "id": 6,
        "value": 2,
        "childrenLeft": 8,
        "childrenRight": 9
      },
      {
        "id": 7,
        "value": 4,
        "childrenLeft": 9,
        "childrenRight": null
      },
      {
        "id": 8,
        "value": 6,
        "childrenLeft": null,
        "childrenRight": null
      },
      {
        "id": 9,
        "value": 9,
        "childrenLeft": 10,
        "childrenRight": null
      },
      {
        "id": 10,
        "value": 2,
        "childrenLeft": null,
        "childrenRight": null
      }
    ]
    
const treeNode=(noderoot)=>{
  if (noderoot.childrenLeft===null && noderoot.childrenRight ===null){
    return 0
  }
  const maxLeftPath = treeNode(noderoot.childrenLeft)
  const maxRightPath = treeNode(noderoot.childrenRight)
  return Math.max(maxLeftPath,maxRightPath)+noderoot.value
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
            item[8] = item[8].slice(0, -1);
            item.push(Number(cursIn[index - 1][5] - Number(item[5]))); // вычислим разность значений между HIGH текущего дня и следующего!!!!!
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
      <div>
      <table>
        <thead>
          <tr>
            {matrtest[0].map((item, index) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {matrtest.slice(1, matrtest.length).map((item, index) => {
            return (
              <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={handlePrint}>Распечатать</button>
      <button className='mr-5' onClick={matrObh}>Анализ матрицы</button>
      <button className='mr-5' onClick={treeNode(JsonTree2.filter(item => item.id === 1))}>Анализ дерева</button>
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
