import ACBCollection from "../data/ACBCollection.mjs";
import VCBCollection from "../data/VCBCollection.mjs";
import { scrapACB } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";

const ExchangeDataController = {
  acb: new ACBCollection(),
  vcb: new VCBCollection(),
  index: async function (req, res, next) {
    let data = [];
    try {
      const acbData = await this.acb.all();
      const vcbData = await this.vcb.all();
      data.push(acbData, vcbData);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  },
  fetch: async function (req, res, next) {
    try {
      const dataACB = await scrapACB();
      const dataVCB = await scrapVCB();
      await this.acb.storage(dataACB);
      await this.vcb.storage(dataVCB);
      res.json("Crawl Success !");
    } catch (error) {}
  },
};

export default ExchangeDataController;
