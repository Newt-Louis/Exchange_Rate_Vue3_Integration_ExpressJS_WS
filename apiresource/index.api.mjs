import express from "express";
import ExchangeDataController from "../controller/ExchangeDataController.mjs";
const apiRoute = express.Router();
const exchangeDataController = new ExchangeDataController();

apiRoute.get("/exchange-data", exchangeDataController.index);
apiRoute.post("/start-crawl", exchangeDataController.fetch);

export default apiRoute;
