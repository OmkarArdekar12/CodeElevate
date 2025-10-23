import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

async function main() {
  try {
    const connection = await mongoose.connect(MONGODB_URL);
    // const connection = await mongoose.connect(MONGODB_URL, {
    //   dbName: "codelevate",
    // });
    return connection;
  } catch (err) {
    throw err;
  }
}

const dbConnect = () => {
  main()
    .then((mongodbConnection) => {
      console.log("Successfully connected to MongoDB Database(DB)");
      // console.log(
      //   `Successfully connected to MongoDB Database(DB): ${mongodbConnection.connection.host}`
      // );
    })
    .catch((err) => {
      console.log(`Connection to MongoDB Database failed: ${err}`);
    });
};

export default dbConnect;
