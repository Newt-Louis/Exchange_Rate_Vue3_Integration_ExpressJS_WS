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
    dataVCB.push(title);
  }
  return { dataVCB };
}
