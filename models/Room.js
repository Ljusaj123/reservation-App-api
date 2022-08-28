import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
});

export default mongoose.model("Room", RoomSchema);
