import { doApiPost } from "../services/apiService";
import Swal from "sweetalert2";
export const onDownload = (jsObjectJson, _filename) => {
  download(jsObjectJson, `${_filename}.json`, "text/plain");
};
const download = (content, fileName, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};
export const sendForm = (_name, _json) => {
  let newObj = {
    name: _name,
    json: _json,
  };
  doApiPost(
    " https://ls-task-back.herokuapp.com/downloads/adddownload",
    newObj
  ).then((data) => {
    if (data.message) {
      Swal.fire({
        icon: "error",
        title: "Error!!!",
        text: "Something went worng!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Your JSON file has been saved",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
};
