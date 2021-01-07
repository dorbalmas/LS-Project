import React, { useEffect, useState } from "react";
import { doApiGet, doApiPost } from "../services/apiService";
import "semantic-ui-css/semantic.min.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { onDownload } from "../usefull/usefulFunctions";
const EditSingle = (props) => {
  let chosendownloadId = props.match.params.id;
  let [itemData, setItemData] = useState({});
  let history = useHistory();
  let [jsonHolder, setjsonHolder] = useState({});
  let [jsObjectJson, setjsObjectJson] = useState();

  const { i18n } = useTranslation();

  useEffect(() => {
    let url = ` https://ls-task-back.herokuapp.com/downloads/singledownload/${chosendownloadId}`;
    doApiGet(url).then((data) => {
      setItemData(data);
      setjsonHolder(JSON.parse(JSON.parse(data.json)));
    });
  }, []);

  const editdownload = (event) => {
    event.preventDefault();

    let newObj = {
      _id: itemData._id,
      name: event.target.nameInput.value,
      json: jsObjectJson,
      date: itemData.date,
    };
    doApiPost(
      " https://ls-task-back.herokuapp.com/downloads/updatedownload",
      newObj
    ).then(async (data) => {
      if (data.message) {
        Swal.fire({
          icon: "error",
          title: "Error!!!",
          text: "Something went worng!",
        });
      } else {
        await Swal.fire({
          title: "Do you want to Download the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `yes`,
        }).then((result) => {
          if (result.isConfirmed) {
            onDownload(jsObjectJson);
            history.push("/list");
          }
        });
        history.push("/list");
      }
    });
  };

  return (
    <div className="container-fluid pt-3">
      <div className="container w-75">
        <form
          onSubmit={editdownload}
          className="border rounded bg-white row align-items-center justify-content-center"
        >
          <div className="text-center text-warning display-4 my-4 h2 col-12">
            <Trans i18nKey="description.part7"></Trans>
          </div>
          <input
            autoFocus
            id="nameInput"
            type="text"
            className="mb-2 w-50 form-control text-center"
            defaultValue={itemData.name}
          />{" "}
          <div className="col-12 justify-content-center">
            <JSONInput
              placeholder={jsonHolder}
              onChange={(e) => {
                setjsObjectJson(JSON.stringify(e.json));
              }}
              locale={locale}
              colors={{
                string: "#DAA520",
              }}
              height="200px"
              width="780px"
            />
          </div>
          <div className="d-flex justify-content-around">
            <button className="btn btn-warning">
              {" "}
              <Trans i18nKey="description.part8"></Trans>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSingle;
