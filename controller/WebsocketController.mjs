import { scrapACB, acbBankTime } from "../puppeteerCrawl/scrapperACB.ppt.mjs";
import { scrapVCB, vcbBankTime } from "../puppeteerCrawl/scrapperVCB.ppt.mjs";
import ACBCollection from "../models/ACBCollection.mjs";
import VCBCollection from "../models/VCBCollection.mjs";
import ExchangeData from "../models/ExchangeData.mjs";
class WebsocketController {
  constructor() {
    this.bank = new ExchangeData();
  }

  async fetchData() {}
  async fetchDataByDatabase() {}

  /**
   *
   * @param {ExchangeData} bank
   */
  async fetchDataByCrawl(bank) {}
  async #checkCurrentBankTime(bank) {
    const currentBankTime = acbBankTime();
    const modelBankTime = this.bank.getCrawledAtNearestTime();
    if (currentBankTime > modelBankTime) {
      return true;
    } else {
      return false;
    }
  }
}
