import { startBrowser } from "./browser.js";

export async function srapACB() {
  const browser = await startBrowser();
  const page = await browser.newPage();
  const cookie = [
    {
      name: "AcceptCookie",
      value: "true",
      domain: "acb.com.vn",
      path: "/",
    },
  ];
  const linkACBExchangeRate = "https://acb.com.vn/ty-gia-hoi-doai";
  // const testLink = "https://books.toscrape.com/";
  // await page.goto(testLink);
  // await page.waitForSelector(".page_inner");
  // const selectResults = ".list-ty-ga .hide-mb";
  // const elements = await page.evaluate(() => {
  //   const anchors = document.querySelectorAll("a").innerHTML;
  //   console.log(anchors);
  //   return anchors;
  // });
  // let urls = await page.$$eval("section ol > li", links => {
  //   // Make sure the book to be scraped is in stock
  //   links = links.filter(link => link.querySelector(".instock.availability > i").textContent !== "In stock");
  //   // Extract the links from the data
  //   links = links.map(el => el.querySelector("h3 > a").href);
  //   return links;
  // });
  // console.log(urls);
  // // await page.waitForSelector(selectResults);
  // return { urls };
  await page.setViewport({ width: 1400, height: 1024 });
  await page.setCookie(...cookie);
  await page.goto(linkACBExchangeRate, { waitUntil: "load" });
  await page.waitForSelector('a[href="#"].btn');
  const buttonLoadMore = await page.$('a[href="#"].btn');
  while (true) {
    let isViewMore = await buttonLoadMore.evaluate(element => element.textContent);

    if (isViewMore.trim() === "Xem thêm") {
      await buttonLoadMore.click();
    } else {
      break;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  await page.waitForSelector("div.list-ty-gia.hide-mb");
  let getParentElement = await page.$("div.list-ty-gia.hide-mb");
  let getAllDescendants = await getParentElement.$$("*");

  // const element = await page.$$eval("section ol > li", links => {
  //   // Make sure the book to be scraped is in stock
  //   links = links.filter(link => link.querySelectorAll(".instock.availability > i").textContent !== " In stock ");
  //   //   // Extract the links from the data
  //   links = links.map(el => el.querySelectorAll("h3 > a").href);
  //   return links;
  // });
  return { getAllDescendants };
}
