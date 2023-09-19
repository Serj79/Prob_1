import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { langs } from "../components/FR/langs";
import { Form, Dropdown } from "react-bootstrap";
function Finereader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [langSelect, setLangSelect] = useState("");
  const [confidence, setConfidence] = useState("");
  const [text, setText] = useState("");

  // function createPreview(loadedFile) {
  //   const reader = new FileReader();
  //   reader.onloadend = function () {
  //     setFileContent = reader.result;
  //   };
  //   reader.readAsDataURL(loadedFile);
  // }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
    };
    reader.readAsDataURL(file);
    // createPreview(file);
  };

  const handleClick = () => {
    Tesseract.recognize(selectedFile, "rus", {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // Get Confidence score
        let confidence = result.data.confidence;
        setConfidence(confidence);
        let text = result.data.text;
        console.log("uuuu", result);
        setText(text);
      });
  };

  return (
    <div>
      <Form>
        <Dropdown className="mt-2 md-2">
          <Dropdown.Toggle>
            {langSelect.text || "Выберите язык"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {langs.map((type) => (
              <Dropdown.Item
                onClick={() => setLangSelect(type)}
                key={type.value}
              >
                {type.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
      <div class="result__preview text-center">
        <img id="preview" width="400" src={fileContent} />
      </div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <h2>Выбранный файл: {selectedFile.name}</h2>
          {/* <pre>{fileContent}</pre> */}
          <button onClick={handleClick} style={{ height: 50 }}>
            {" "}
            Распознать текст
          </button>
          <div className="text-box">
            <p> {text} </p>
            <p> Уверенность {confidence}% </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Finereader;
