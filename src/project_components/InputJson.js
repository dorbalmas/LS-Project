import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { onDownload, sendForm } from "../usefull/usefulFunctions";
import { Popup } from "semantic-ui-react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { Trans, useTranslation } from "react-i18next";
import "semantic-ui-css/semantic.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import TranslateComp from "./TranslateComp";
import { set } from "lodash";
const InputJson = () => {
  let history = useHistory();
  let [size, setsize] = useState("");
  let sizeRefInput = useRef("");
  let [sampleData, setsampleData] = useState();
  let [jsObjectJson, setjsObjectJson] = useState();
  let [errorJson, seterrorJson] = useState(true);
  let onDownloadHolder = () => {
    (async () => {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputPlaceholder: "Type your JSON name here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: true,
      });

      if (text) {
        sendForm(text, JSON.stringify(jsObjectJson));
        onDownload(jsObjectJson, text);
        history.push("/list");
      }
    })();
  };

  const onChangeFile = (e) => {
    let file = e.target.files[0];
    let jsonType = /json.*/;
    let jsonSize = 25000000;

    if (file.type.match(jsonType) && file.size <= jsonSize) {
      let reader = new FileReader();

      reader.onload = function () {
        setsampleData(JSON.parse(reader.result));
        setjsObjectJson(reader.result);
      };
      seterrorJson(false);
      reader.readAsText(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "File not supported!",
        text: "Please enter a json file",
      });
    }
  };

  useTranslation();
  return (
    <div
      className="container-fluid justify-content-lg-center align-items-center border border-grey  "
      style={{ maxWidth: "1020px", backgroundColor: "white" }}
    >
      <div className="container my-4 border border-light ">
        <h3>
          <b>
            {" "}
            <Trans i18nKey="instruction.1"></Trans>
          </b>
        </h3>
        <div
          className=" btn btn-toolbar w-100 bg-white "
          style={{ opacity: "0.87" }}
        >
          <div className="row w-100 justify-content-between align-items-center">
            {" "}
            <Popup
              content={size ? Math.floor(size / 20) : 10}
              trigger={
                <input
                  onChange={() => {
                    setsize(sizeRefInput.current.value);
                  }}
                  type="range"
                  defaultValue="210"
                  className="custom-range col-lg-10"
                  id="customRange1"
                  min="100"
                  max="1000"
                  ref={sizeRefInput}
                />
              }
            />{" "}
            <Popup
              content="Delete!"
              trigger={
                <button
                  className="col-1 btn btn-light "
                  onClick={() => {
                    setsampleData({});
                  }}
                >
                  <i className="fas fa-backspace "></i>
                </button>
              }
            />
          </div>
        </div>
        <div className="col">
          <input
            type="file"
            className="my-3"
            onChange={(e) => onChangeFile(e)}
          />
        </div>

        <div className="col">
          <JSONInput
            placeholder={sampleData}
            onChange={(e) => {
              setjsObjectJson(JSON.stringify(e.jsObject));
              seterrorJson(e.error);
            }}
            locale={locale}
            colors={{
              string: "#DAA520",
            }}
            height={!size ? "210px" : size + "px"}
            width="940px"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={!sampleData ? true : errorJson}
            onClick={onDownloadHolder}
            type="button"
            className=" btn btn-info "
          >
            {" "}
            <i className="fas fa-download"></i>{" "}
            <Trans i18nKey="description.part2"></Trans>
          </button>
        </div>
      </div>
      <div className="container border border-light mt-2">
        <TranslateComp jsObjectJson={jsObjectJson} errorJson={errorJson} />
      </div>
    </div>
  );
};

export default InputJson;
