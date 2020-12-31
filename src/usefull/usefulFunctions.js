export const onDownload = (jsObjectJson) => {
  download(jsObjectJson, "json-file-name.json", "text/plain");
  console.log(jsObjectJson);
};
const download = (content, fileName, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};
