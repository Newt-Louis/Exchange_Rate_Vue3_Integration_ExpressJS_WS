import ExchangeData from "./ExchangeData.mjs";

/**
 * @extends ExchangeData
 */
class ACBCollection extends ExchangeData {
  constructor() {
    super("exchange-rate-app", "acb-collection");
  }
}

export default ACBCollection;
