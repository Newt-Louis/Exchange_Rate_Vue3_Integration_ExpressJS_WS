import express from "express";
import { scrapACB } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";
import { startBrowser } from "../puppeteerCrawl/browser.mjs";
import { readCrawlFile } from "../plugin/utitlities.plugin.mjs";
import ExchangeDataController from "../controller/ExchangeDataController.mjs";
const Route = express.Router();

Route.get("/exchange-data", ExchangeDataController.index);
Route.post("/start-crawl", ExchangeDataController.fetch);

export default Route;
