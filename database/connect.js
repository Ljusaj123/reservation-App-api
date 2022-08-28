import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished");
});
mongoose.connection.on("close", () => {
  console.log("Connection Closed");
});

export default connectDB;
