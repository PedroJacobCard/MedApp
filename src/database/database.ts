import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECT as string)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Connection error:", error.message);
});

const db = mongoose.connection;

export default db;