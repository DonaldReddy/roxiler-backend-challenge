import mongoose from "mongoose";

export default async function dbConnect() {
    await mongoose.connect("mongodb+srv://donaldreddy2712:Leo%4020027112@cluster0.ua9gngy.mongodb.net/roxiler")
}