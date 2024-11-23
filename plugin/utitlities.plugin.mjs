import fs, { readFile, writeFile } from "node:fs/promises";

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

/**
 *
 * @param {Date} dateObj
 */
export const formattedDate = dateObj => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDay()).padStart(2, "0");
  const hour = String(dateObj.getDay()).padStart(2, "0");
  const minute = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const writeCrawlFile = async data => {
  const path = "./data/crawldata.json";
  let dataToAdd = [];
  let currentDataFile = JSON.parse(await readFile(path, "utf-8"));
  if (currentDataFile.length > 1) {
    currentDataFile = [];
  }
  currentDataFile.push(data);
  dataToAdd = JSON.stringify(currentDataFile);
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
