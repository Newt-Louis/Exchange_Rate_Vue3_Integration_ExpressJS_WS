import ACBCollection from "../models/ACBCollection.mjs";
import VCBCollection from "../models/VCBCollection.mjs";
import { scrapACB, acbBankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB, vcbBankTime } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";

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
    // const result = await vcbBankTime();
    // res.status(200).json(result);
    // console.log("api get-data trong controller dòng 10");
    // const currentUpdateBankTime = await acbBankTime();
    // const lastCrawled = await this.acb.getCrawledAtNearestTime();
    // if (lastCrawled <= currentUpdateBankTime) {
    //   res.status(200).json({ message: "All data was up to date" });
    // } else {
    //   let newObjectData = {};
    //   const dataACB = await scrapACB();
    //   newObjectData["data"] = dataACB.data;
    //   newObjectData["crawled_at"] = currentUpdateBankTime;
    //   const insertDatabase = await this.acb.storage(newObjectData);
    //   res.status(200).json(insertDatabase);
    // }
  };

  fetch = async (req, res, next) => {
    console.log("Lệnh thực thi ở Controller dòng 25");
    const acb = new ACBCollection();
    const result = acb.storage([{ bank: "ACB", time: "now", data: [{ name: "something", value: "something" }] }]);
    return res.status(200).json(result);
  };
}

export default ExchangeDataController;
