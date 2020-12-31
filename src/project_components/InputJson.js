import React, { useState, useRef } from "react";
import { Popup } from "semantic-ui-react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { Trans, useTranslation } from "react-i18next";
import { onDownload } from "../usefull/usefulFunctions";
import "semantic-ui-css/semantic.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import TranslateComp from "./TranslateComp";
const InputJson = () => {
  let [size, setsize] = useState("");
  let sizeRefInput = useRef("");
  let [sampleData, setsampleData] = useState();
  let [jsObjectJson, setjsObjectJson] = useState();
  let [errorJson, seterrorJson] = useState(true);
  let [countChar, setcountChar] = useState(null);
  let onDownloadHolder = () => {
    onDownload(jsObjectJson);
  };
  const { i18n } = useTranslation();
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
                    setcountChar(2);
                  }}
                >
                  <i className="fas fa-backspace "></i>
                </button>
              }
            />
          </div>
        </div>

        <div className="col">
          <JSONInput
            id="id_json"
            waitAfterKeyPress={100}
            placeholder={sampleData}
            onChange={(e) => {
              setcountChar(
                e.plainText == undefined
                  ? 0
                  : e.plainText.replace(/\s/g, "").length
              );
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
            disabled={countChar === 0 ? true : errorJson}
            onClick={onDownloadHolder}
            type="button"
            className=" btn btn-info "
          >
            {" "}
            <i className="fas fa-download"></i>{" "}
            <Trans i18nKey="description.part2"></Trans>
          </button>
          <p className="h5">
            {" "}
            <b>
              {" "}
              <Trans i18nKey="description.part1"> </Trans>
            </b>{" "}
            {countChar ? countChar : 0} / 3000
          </p>
        </div>
      </div>
      <div className="container border border-light mt-2">
        <TranslateComp
          jsObjectJson={jsObjectJson}
          errorJson={errorJson}
          countChar={countChar}
        />
      </div>
    </div>
  );
};

export default InputJson;
