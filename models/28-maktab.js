import mongoose, { Schema } from "mongoose";

const maktabSchema = new Schema(
    {
        shaxs: String,
        maktab: Number,
        sinf: Number,
        pupil: String,
        YangiTelefonRaqamiUser: String,
    },
    {
        timestamps: true,
    }
);

const Maktab28 = mongoose.models.Maktab28 || mongoose.model("Maktab28", maktabSchema);

export default Maktab28;
