import Alert from "@/models/alert";
import Transaction from "@/models/transaction";
import User from "@/models/user";

const rejectTransactionHandler = async (req: any, res: any) => {
  try {
    const transaction = await Transaction.findById(req.body.transactionId);
    if (!transaction)
      return res.status(404).send({ error: "Transaction not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(transaction.ownerId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    await Transaction.findByIdAndUpdate(transaction._id, {
      failedReason: req.body.failedReason,
      status: "failed",
    });

    await new Alert({
      message: `Your trade of $${transaction.priceAmount} failed`,
      type: "notification",
      ownerId: user._id,
    }).save();

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default rejectTransactionHandler;
