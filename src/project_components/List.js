import React, { useState, useEffect } from "react";
import { doApiGet, doApiPost } from "../services/apiService";
import ItemList from "./ItemList";
import * as ReactbootStrap from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";

const List = (props) => {
  let [arr_list, setArr_list] = useState([]);
  let [loading, setloading] = useState(true);
  let counter = 0;
  const { i18n } = useTranslation();
  useEffect(() => {
    let url = " https://ls-task-back.herokuapp.com/downloads";
    if (props.match.params.qS) {
      url = ` https://ls-task-back.herokuapp.com/downloads/searchdownload/?q=${props.match.params.qS}`;
    }
    let timer = setTimeout(() => {
      doApiGet(url).then((data) => {
        setArr_list(data);
        setloading(false);
      });
    }, 200);
    setloading(true);
    return () => clearTimeout(timer);
  }, [props.match]);

  const remove = (_downloadId) => {
    doApiPost(
      " https://ls-task-back.herokuapp.com/downloads/removedownload",
      _downloadId
    ).then((data) => {
      if (data.message == "deleted")
        doApiGet(" https://ls-task-back.herokuapp.com/downloads").then(
          (data) => {
            setArr_list(data);
          }
        );
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {loading ? (
            <div>
              <div style={{ height: "100px" }}></div>
              <ReactbootStrap.Spinner animation="border" />
            </div>
          ) : (
            <table class="table my-2 border rounded mx-5">
              <thead className="bg-warning">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">
                    <Trans i18nKey="table.name"></Trans>
                  </th>
                  <th scope="col">
                    <Trans i18nKey="table.json"></Trans>
                  </th>
                  <th scope="col">
                    <Trans i18nKey="table.date"></Trans>
                  </th>
                  <th scope="col">
                    <Trans i18nKey="table.delete"></Trans>
                  </th>
                </tr>
              </thead>

              {arr_list.map((item) => {
                return (
                  <ItemList
                    key={item._id}
                    item={item}
                    remove={remove}
                    counter={++counter}
                  />
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
