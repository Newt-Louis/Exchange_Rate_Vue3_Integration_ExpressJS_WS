import express from "express";
import { srapACB } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";
import { startBrowser } from "../puppeteerCrawl/browser.mjs";
const apiIndexRoute = express.Router();

apiIndexRoute.post("/acb-exchange-rate", async function (req, res, next) {
  const scrapData = await scrapVCB();
  console.log(scrapData);
  // res.send(scrapData);
});

export default apiIndexRoute;
