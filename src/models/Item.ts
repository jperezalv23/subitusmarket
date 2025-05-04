import mongoose, { Schema, Document, models } from "mongoose";

export interface IItem extends Document {
  name: string;
  quantity: number;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const Item = models.Item || mongoose.model<IItem>("Item", ItemSchema);
