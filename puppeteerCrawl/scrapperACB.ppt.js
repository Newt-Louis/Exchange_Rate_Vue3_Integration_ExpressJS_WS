import { startBrowser } from "./browser.js";

export async function srapACB() {
  const browser = await startBrowser();
  const page = await browser.newPage();

  const link = "https://acb.com.vn/ty-gia-hoi-doai";
  const testLink = "https://books.toscrape.com/";
  await page.goto(testLink);
  const selectResults = ".list-ty-ga .hide-mb";
  const elements = await page.evaluate(() => {
    const anchors = document.querySelectorAll("a");
    return anchors;
  });
  // await page.waitForSelector(selectResults);

  await browser.close();
  return { elements };
}
