const API_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getData = async (nodeId?: string) => {
  const data = await fetch(`${API_URL}/${nodeId ? nodeId : ""}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("http error");
      }
      return res.json();
    })
    .catch((e) => alert(e))
    .finally(() => {});
  return data;
};
