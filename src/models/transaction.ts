import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    priceAmount: { type: Number, required: true },
    actuallyPaid: { type: Number },
    payoutRate: { type: Number },
    payoutCurrency: {
      name: { type: String, default: "Nigerian Naira" },
      code: { type: String, default: "NGN" },
      symbol: { type: String, default: "₦" },
    },
    status: {
      type: String,
      require: true,
      default: "waiting",
      enum: ["waiting", "processing", "successful", "failed"],
    },
    paymentProof: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    payoutProof: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    coinId: { type: Types.ObjectId, required: true },
    ownerId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
