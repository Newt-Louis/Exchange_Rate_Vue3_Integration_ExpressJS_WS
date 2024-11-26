import ACBCollection from "../models/ACBCollection.mjs";
import { scrapACB, acbBankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";

class ACBController {
  constructor() {
    this.acb = new ACBCollection();
  }
  async handlerWebsocket() {
    let time = await this.#checkCurrentBankTime();
    let acbResult = {};
    try {
      if (time.checkTime) {
        acbResult = await this.fetchDataByCrawl(time.crawled_at);
      } else {
        const nearestTime = this.acb.getCrawledAtNearestTime();
        acbResult = await this.fetchDataByCrawledAt(nearestTime);
      }
    } catch (error) {
      console.log(error);
    }
    return acbResult;
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
      await this.acb.storage({ data: acbData.data }, crawledAt);
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
  async fetchDataByCrawledAt(crawledAt) {
    try {
      const result = await this.acb.index(crawledAt);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getCrawledAt() {
    try {
      const result = await this.acb.getArrayCrawledAt();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
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

export default ACBController;
