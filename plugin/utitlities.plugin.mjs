export const deepCopy = obj => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }

  return copy;
};

export const writeCrawlFile = async data => {
  const path = "./data/crawldata.json";
  const jsondata = JSON.stringify(data);
  const currentDataFile = readFile(path, "utf-8");
  const dataToAdd = (await currentDataFile).concat(jsondata);
  try {
    await writeFile(path, dataToAdd);
  } catch (error) {
    console.log("có lỗi khi ghi file" + error);
  }
};
export const readCrawlFile = async () => {
  const path = "./data/crawldata.json";
  let jsondata = "";
  try {
    jsondata = await readFile(path, { encoding: "utf-8" });
  } catch (error) {
    jsondata = "Lỗi khi lấy dữ liệu !";
    console.log("có lỗi khi đọc file" + error);
  }
  return jsondata;
};
