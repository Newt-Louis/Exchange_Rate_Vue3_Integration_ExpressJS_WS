import ACBCollection from "../models/ACBCollection.mjs";
import VCBCollection from "../models/VCBCollection.mjs";
import { scrapACB, acbBankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";

class ExchangeDataController {
  constructor() {
    this.acb = new ACBCollection();
    this.vcb = new VCBCollection();
  }

  /**
   * Controller functions should be written as arrow function cause the context of the "this" keyword
   * will be managed by the controller class.
   *
   * If writing functions in controller class like usual way "this" keyword will depend on where it is
   * called, so that when we call function in callback function of middleware "this" keyword will be
   * the ExpressJS.Router() object.
   */
  index = async (req, res, next) => {
    console.log("api get-data trong controller dòng 10");
    // const result = await acbBankTime();
    const dbCrawledAt = await this.acb.getCrawledAtNearestTime();
    res.status(200).json(dbCrawledAt);
  };

  fetch = async (req, res, next) => {
    console.log("Lệnh thực thi ở Controller dòng 25");
    const acb = new ACBCollection();
    const result = acb.storage([{ bank: "ACB", time: "now", data: [{ name: "something", value: "something" }] }]);
    return res.status(200).json(result);
  };
}

export default ExchangeDataController;
