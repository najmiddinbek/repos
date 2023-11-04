import { connectMongoDB } from "../../../lib/mongodb";
import Topic from "../../../models/28-maktab";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newShaxs: shaxs, newShaxsiy: shaxsiy, newMaktab: maktab, newSinf: sinf, newPupil: pupil, newnewSinf: newSinfi, newnewnewDarsQoldirish: newDarsQoldirish, newtelephoneRaqami: telephoneRaqami, newIsmi: newIsm, newYangiTelefonRaqamiUser: YangiTelefonRaqamiUser } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { shaxs, maktab, sinf, pupil, YangiTelefonRaqamiUser, shaxsiy, newSinfi, newDarsQoldirish, telephoneRaqami, newIsm });
    return NextResponse.json({ message: "Maktab Yangilandi" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
}
