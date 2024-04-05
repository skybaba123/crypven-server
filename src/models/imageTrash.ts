import { Schema, model, Types } from "mongoose";

const imageTrashSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    locationId: { type: Types.ObjectId, required: true },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const ImageTrash = model("ImageTrash", imageTrashSchema);

export default ImageTrash;
