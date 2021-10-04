const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["INPROCESS", "DONE"],
  },
  dueDate: { type: String },
  enable: { type: Boolean, enum: [true, false] },
  creatAt: { type: Date, default: Date.now() },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
