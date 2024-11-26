import VCBCollection from "../models/VCBCollection.mjs";
import { scrapVCB, vcbBankTime } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";

class VCBController {
  constructor() {
    this.vcb = new VCBCollection();
  }
  async handlerWebsocket() {
    let time = await this.#checkCurrentBankTime();
    let vcbResult = {};
    try {
      if (time.checkTime) {
        vcbResult = await this.fetchDataByCrawl(time.crawled_at);
      } else {
        const nearestTime = await this.vcb.getCrawledAtNearestTime();
        vcbResult = await this.fetchDataByCrawledAt(nearestTime);
        vcbResult["bank"] = "VCB";
      }
    } catch (error) {
      console.log(error);
    }
    return vcbResult;
  }
  async fetchDataByDatabase() {
    try {
      const result = await this.vcb.all();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchDataByCrawl(crawledAt) {
    try {
      const vcbData = await scrapVCB();
      await this.vcb.storage({ data: vcbData.data }, crawledAt);
      return vcbData;
    } catch (error) {
      console.log(error);
    }
  }
  async store(data, crawledAt) {
    try {
      await this.vcb.storage(data, crawledAt);
    } catch (error) {
      console.log(error);
    }
  }
  async fetchDataByCrawledAt(crawledAt) {
    try {
      const result = await this.vcb.index(crawledAt);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async #checkCurrentBankTime() {
    try {
      const currentBankTime = await vcbBankTime();
      const collectionBankTime = await this.vcb.getCrawledAtNearestTime();
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

export default VCBController;
