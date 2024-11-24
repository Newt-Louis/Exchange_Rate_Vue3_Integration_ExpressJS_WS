import ACBCollection from "../data/ACBCollection.mjs";
import VCBCollection from "../data/VCBCollection.mjs";
import { scrapACB } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
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
  }

  async fetch(req, res, next) {
    console.log("Lệnh thực thi ở Controller dòng 25");
  }
}
export default ExchangeDataController;
