import ACBCollection from "../models/ACBCollection.mjs";
import VCBCollection from "../models/VCBCollection.mjs";
import { scrapACB, bankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";

// const ExchangeDataController = {
//   acb: new ACBCollection(),
//   vcb: new VCBCollection(),
//   index: async function (req, res, next) {
//     console.log("api get-data trong controller dòng 10");

//     let data = [];
//     try {
//       const acbData = await this.acb.all();
//       const vcbData = await this.vcb.all();
//       data.push(acbData, vcbData);
//       res.json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   fetch: async function (req, res, next) {
//     try {
//       // const dataACB = await scrapACB();
//       // const dataVCB = await scrapVCB();
//       console.log("Lệnh thực thi ở Controller dòng 25");
//       await this.acb.storage([{ bank: "ACB", data: [{ name: "something", place: "somewhere" }], created_at: "now" }]);
//       // await this.vcb.storage(dataVCB);
//       res.json("Crawl Success !");
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
class ExchangeDataController {
  constructor() {
    this.acb = new ACBCollection();
    this.vcb = new VCBCollection();
  }
  async index(req, res, next) {
    console.log("api get-data trong controller dòng 10");
    const result = await bankTime();

    res.status(200).json(result);
  }

  async fetch(req, res, next) {
    console.log("Lệnh thực thi ở Controller dòng 25");
    const acb = new ACBCollection();
    const result = acb.storage([{ bank: "ACB", time: "now", data: [{ name: "something", value: "something" }] }]);
    return res.status(200).json(result);
  }
}
export default ExchangeDataController;
