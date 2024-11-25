import Connection from "./Connect.mjs";
import { formattedDate } from "../plugin/utitlities.plugin.mjs";

class ExchangeData {
  constructor(database, collection) {
    this.database = database;
    this.collection = collection;
    this.db = Connection.getCollection(this.database, this.collection);
  }
  storage = async data => {
    try {
      const now = new Date();
      data["created_at"] = formattedDate(now);
      // const client = new Connection();
      const db = await Connection.getCollection(this.database, this.collection);
      const result = await db.insertMany(data);
      console.log("Insert MongoDB Success", result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  all = async () => {
    try {
      const db = await Connection.getCollection(this.database, this.collection);
      const result = await db.find({}).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  async getCrawledAtNearestTime() {
    try {
      const db = await Connection.getCollection(this.database, this.collection);
    } catch (error) {}
  }
}

export default ExchangeData;
