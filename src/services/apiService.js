export const doApiGet = async (_url) => {
  let resp = await fetch(_url);
  let data = await resp.json();
  return data;
};

export const doApiPost = async (_url, _body) => {
  let resp = await fetch(_url, {
    method: "POST",
    body: JSON.stringify(_body),
    headers: {
      "content-type": "application/json",
    },
  });
  let data = await resp.json();
  return data;
};
