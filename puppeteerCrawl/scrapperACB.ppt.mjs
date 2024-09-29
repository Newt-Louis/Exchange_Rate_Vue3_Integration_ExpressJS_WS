import { startBrowser } from "./browser.mjs";

export async function scrapACB() {
  /* required variables */
  /* create new instance puppeteer and open Chromium */
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
  const keysObject = ["title", "buyCash", "buyTransfer", "sellCash", "sellTransfer"];
  const dataACB = [];
  const linkACBExchangeRate = "https://acb.com.vn/ty-gia-hoi-doai";

  /* 
    use Puppeteer to set default cookie so that we can pass through notify cookie wich will
    prevent click event on load more button.
  */
  await page.setViewport({ width: 1400, height: 1024 });
  await page.setCookie(...cookie);
  /* waitUntil page finish loaded all it resource include js */
  await page.goto(linkACBExchangeRate, { waitUntil: "load" });
  /* waitForSelector need to be sure if the network is slow or meet an error with connection */
  await page.waitForSelector('a[href="#"].btn');
  /* access to load more button and set click event until it change textContent to "Thu gọn" */
  const buttonLoadMore = await page.$('a[href="#"].btn');
  while (true) {
    let isViewMore = await buttonLoadMore.evaluate(element => element.textContent);

    if (isViewMore.trim() === "Xem thêm") {
      await buttonLoadMore.click();
    } else {
      break;
    }
    /* setTimeout to reflect behavior more like a person */
    await new Promise(r => setTimeout(r, 1000));
  }
  await page.waitForSelector("div.list-ty-gia.hide-mb");
  /* 
    function $ will return first element match the css selector and return ElementHandle instance
    provided by puppeteer. It same return with function $eval but different execute logic.
  */
  const getParentElement = await page.$("div.list-ty-gia.hide-mb");
  /* 
    function $$ will return an array with each element is ElementHandle instance
    that contains each element mactch the css selector. It same return with function $$eval but different
    execute logic.
  */
  const getAllDescendants = await getParentElement.$$("div.item.dl-grid-md-5.gap-0");
  /* 
    Thanks to the ElementHandle object that puppeteer provides,
    we can narrow the scope of accessing DOM objects without caring about
    whether the internal DOM object is similar to other objects outside
    the currently selected object.
*/
  for (let index = 0; index < getAllDescendants.length; index++) {
    const checkH4 = await getAllDescendants[index].$("h4");
    const title = await checkH4.evaluate(text => text.textContent);
    dataACB.push([title]);
  }
  for (let index = 0; index < getAllDescendants.length; index++) {
    let spanArray = await getAllDescendants[index].$$("span");
    /* 
      New lesson learned here about normal for, forEach, map.
      normal for and map both are synchronized loop, wich mean they will wait until a Promises object to be done.
      forEach is asynchronous loop, it will always iterate over the inner elements regardless of whether there is a Promises object or not. 
    */
    const exchangeValue = spanArray.map(async element => {
      return await element.evaluate(value => value.textContent);
    });
    const temptArray = await Promise.all(exchangeValue);
    /* temptArray now is a new Array created by map function so that we have to spread it */
    dataACB[index].push(...temptArray);
  }

  /* Transform nested array to array of objects */
  const result = dataACB.reduce((accumulator, currentRow) => {
    const newObject = {};
    keysObject.forEach((key, index) => {
      newObject[key] = currentRow[index];
    });
    accumulator.push(newObject);
    return accumulator;
  }, []);
  await browser.close();
  return { result };
}
