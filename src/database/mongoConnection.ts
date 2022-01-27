import mongoose from "mongoose";

import { config } from "../config/Constants";

export class MongoConnection {
  public async connect() {
    try {
      await mongoose.connect(config.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("database connected");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
