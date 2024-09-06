import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class Db {
  mongo: MongoMemoryServer | undefined = undefined;
  
  async setup() {
    this.mongo = await MongoMemoryServer.create();
    const url = this.mongo.getUri();
  
    await mongoose.connect(url);
  }
  
  async dropDataBase() {
    if (this.mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await this.mongo.stop();
    }
  }
  
  async dropCollections() {
    if (this.mongo) {
      const collections = mongoose.connection.collections;
  
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
      }
    }
  }
}

export default new Db;
