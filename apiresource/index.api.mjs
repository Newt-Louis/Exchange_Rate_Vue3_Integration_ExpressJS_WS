import express from "express";
import ExchangeDataController from "../controller/ExchangeDataController.mjs";
import ACBController from "../controller/ACBController.mjs";
import VCBController from "../controller/VCBController.mjs";
const apiRoute = express.Router();
const exchangeDataController = new ExchangeDataController();
const acbBank = new ACBController();
const vcbBank = new VCBController();

apiRoute.get("/exchange-data", exchangeDataController.index);
apiRoute.post("/start-crawl", exchangeDataController.fetch);

apiRoute.get("/acb/datas", function (req, res, next) {});
apiRoute.get("/acb/crawled-time", async function (req, res, next) {
  const result = await acbBank.getCrawledAt();
  res.status(200).json(result);
});
export default apiRoute;
