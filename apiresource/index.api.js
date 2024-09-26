import express from "express";
import { srapACB } from "../puppeteerCrawl/scrapperACB.ppt.js";
import { startBrowser } from "../puppeteerCrawl/browser.js";
const apiIndexRoute = express.Router();

apiIndexRoute.post("/acb-exchange-rate", async function (req, res, next) {
  const scrapData = await srapACB();
  console.log("route hoạt động");
  // res.send(scrapData);
});

export default apiIndexRoute;
