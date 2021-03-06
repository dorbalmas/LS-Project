import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { onDownload } from "../usefull/usefulFunctions";
export function Td({ children, to }) {
  const ContentTag = to ? Link : "div";

  return (
    <td>
      <ContentTag className="form-control-range " to={to}>
        {children}
      </ContentTag>
    </td>
  );
}

const ItemList = (props) => {
  let item = props.item;
  let counter = props.counter;
  const onDownloadHolder = () => {
    onDownload(JSON.parse(item.json), item.name);
  };
  return (
    <tbody className="bg-white">
      <tr className="changeMeTr text-center ">
        <Td to={`/single/${item._id}`}>{counter}</Td>
        <td>
          {" "}
          <button className="btn text-info" onClick={onDownloadHolder}>
            <i className="fas fa-download"></i>{" "}
          </button>
        </td>
        <Td to={`/single/${item._id}`}>{item.name}</Td>
        <Td to={`/single/${item._id}`}>
          <textarea
            rows="1"
            className=" form-control-range"
            disabled
            defaultValue={item.json}
          ></textarea>
        </Td>
        <Td to={`/single/${item._id}`}>{item.date}</Td>

        <Td>
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.value) {
                  Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  props.remove(item);
                }
              });
            }}
            className="btn-dark rounded h5 text-light"
          >
            X
          </button>
        </Td>
      </tr>
    </tbody>
  );
};

export default ItemList;
