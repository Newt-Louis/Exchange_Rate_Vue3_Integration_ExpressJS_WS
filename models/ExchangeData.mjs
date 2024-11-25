import Connection from "./Connect.mjs";
import { formattedDate } from "../plugin/utitlities.plugin.mjs";

class ExchangeData {
  constructor(database, collection) {
    this.database = database;
    this.collection = collection;
    Connection.getCollection(this.database, this.collection)
      .then(db => {
        this.db = db;
      })
      .catch(error => {
        console.log(error);
      });
  }
  storage = async (data, timeOnWebBank) => {
    try {
      data["crawled_at"] = timeOnWebBank;
      // const client = new Connection();
      // const db = await Connection.getCollection(this.database, this.collection);
      const result = await this.db.insertMany(data);
      console.log("Insert MongoDB Success", result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  all = async () => {
    try {
      // const db = await Connection.getCollection(this.database, this.collection);
      const result = await this.db.find({}).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  async getCrawledAtNearestTime() {
    try {
      // const db = await Connection.getCollection(this.database, this.collection);
      const arrayCrawledAt = await this.db.find({}, { crawled_at: 1, _id: 0 });
    } catch (error) {}
  }
}

export default ExchangeData;
