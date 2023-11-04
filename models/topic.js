import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    school: String,
    telNumber: Number,
    darsQoldirish: Number,
    manzili: String,
    newSinfi: String,
    newDarsQoldirish: String,
    telephoneRaqami: String,
    newIsm: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
