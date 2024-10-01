import { startBrowser } from "./browser.mjs";

export async function scrapVCB() {
  const browser = await startBrowser();
  const page = await browser.newPage();
  const link = "https://www.vietcombank.com.vn/vi-VN/KHCN/Cong-cu-Tien-ich/Ty-gia";
  const keysObject = ["title", "buyCash", "buyTransfer", "sellCash", "sellTransfer"];
  const dataVCB = [];

  await page.setViewport({ width: 1400, height: 1024 });
  await page.goto(link, { waitUntil: "load" });
  await page.waitForSelector("div.load-more-button");
  const buttonLoadMore = await page.$("div.load-more-button");
  await buttonLoadMore.click();
  const getParentElement = await page.$("tbody");
  const getAllDescendants = await getParentElement.$$("tr");
  for (let index = 0; index < getAllDescendants.length; index++) {
    const getTitle = await getAllDescendants[index].$("td:nth-child(1)");
    const title = await getTitle.evaluate(value => value.textContent);
    dataVCB.push([title]);
  }
  for (let index = 0; index < getAllDescendants.length; index++) {
    const tdElements = await getAllDescendants[index].$$("td:not(:first-child)");
    const tdValues = tdElements.map(async element => {
      return await element.evaluate(value => value.textContent);
    });
    const temptArray = await Promise.all(tdValues);
    dataVCB[index].push(...temptArray);
  }
  /* transform array */
  for (let index = 0; index < dataVCB.length; index++) {
    dataVCB[index].splice(1, 1);
    let temptLastValue = dataVCB[index][dataVCB[index].length - 1];
    dataVCB[index].push(temptLastValue);
  }
  /* Transform nested array to array of objects */
  const arrayObject = dataVCB.reduce((accumulator, currentRow) => {
    const newObject = {};
    keysObject.forEach((key, index) => {
      newObject[key] = currentRow[index];
    });
    accumulator.push(newObject);
    return accumulator;
  }, []);
  await browser.close();

  const result = { bank: "VCB", data: arrayObject };
  return result;
}
