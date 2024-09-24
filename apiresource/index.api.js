import express from "express";
import { srapACB } from "../puppeteerCrawl/scrapperACB.ppt.js";
const apiIndexRoute = express.Router();

apiIndexRoute.post("/acb-exchange-rate", async function (req, res, next) {
  const browser = await srapACB();
  res.send("Nhận được tín hiệu request");
});

export default apiIndexRoute;
