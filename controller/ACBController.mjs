import ACBCollection from "../models/ACBCollection.mjs";
import { scrapACB, acbBankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";

class ACBController {
  constructor() {
    this.acb = new ACBCollection();
  }

  async fetchDataByDatabase() {
    try {
      const result = await this.acb.all();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchDataByCrawl(crawledAt) {
    try {
      const acbData = await scrapACB();
      // await this.acb.storage([acbData.data], crawledAt);
      return acbData;
    } catch (error) {
      console.log(error);
    }
  }
  async store(data, crawledAt) {
    try {
      await this.acb.storage(data, crawledAt);
    } catch (error) {
      console.log(error);
    }
  }
  async fetchDataByCrawledAt() {}
  async #checkCurrentBankTime() {
    try {
      const currentBankTime = await acbBankTime();
      const collectionBankTime = await this.acb.getCrawledAtNearestTime();
      if (currentBankTime > collectionBankTime) {
        return { crawled_at: currentBankTime, checkTime: true };
      } else {
        return { checkTime: false };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
