import Connection from "./Connect.mjs";
import { formattedDate } from "../plugin/utitlities.plugin.mjs";

const database = "exchange-rate-app";
const collection = "exchange-data";
const ExchangeData = {
  storage: async data => {
    try {
      const now = new Date();
      data["created_at"] = formattedDate(now);
      const db = await Connection.getCollection(database, collection);
      const result = await db.insertMany(data);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  all: async () => {
    try {
      const db = await Connection.getCollection(database, collection);
      const result = await db.find({}).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ExchangeData;
