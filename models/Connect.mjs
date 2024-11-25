import { MongoClient, ServerApiVersion } from "mongodb";

class ConnectionInstace {
  static instance;
  constructor() {
    if (ConnectionInstace.instance) {
      return ConnectionInstace.instance;
    }
    this.uri =
      "mongodb+srv://newt_louis:sajB6kmG6dkqm6eO@newtsdatabase.rn2j8.mongodb.net/?retryWrites=true&w=majority&appName=NewtsDatabase";
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    ConnectionInstace.instance = this;
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connect with MongoDB Success");
    } catch (error) {
      console.log(error);
    }
  }

  async getCollection(dbName, collectionName) {
    return this.client.db(dbName).collection(collectionName);
  }
}

const Connection = new ConnectionInstace();

export default Connection;
