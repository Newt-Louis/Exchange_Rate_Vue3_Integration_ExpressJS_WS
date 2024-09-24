import { Router } from "express";
import { srapACB } from "../puppeteerCrawl/scrapperACB.ppt.js";
const router = Router();

router.post("/api/acb-exchange-rate", async function (req, res, next) {
  const browser = await srapACB();
  res.send(browser);
});

export default router;
