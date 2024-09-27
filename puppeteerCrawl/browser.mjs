import puppeteer from "puppeteer-core";

export async function startBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: false,
      args: ["--disable-setuid-sandbox", "--disable-extensions"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log(`Có lỗi xảy ra ở instance browser` + err);
  }
  return browser;
}
