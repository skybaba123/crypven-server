import Bank from "@/models/bank";
import User from "@/models/user";

const updateBankHandler = async (req: any, res: any) => {
  try {
    const bank = await Bank.findById(req.body.bankId);
    if (!bank) return res.status(404).send({ error: "Bank not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    const user = await User.findById(bank.ownerId);
    if (!user) return res.status(404).send({ error: "No User Found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    )
      return res.status(401).send({ error: "Unauthorized access" });

    if (req.body.defaultAccount && req.body.defaultAccount === "yes") {
      if (bank.defaultAccount === "yes") {
        return res
          .status(400)
          .send({ error: "This is already the defauly bank" });
      }
      await Bank.updateMany({ ownerId: user._id }, { defaultAccount: "no" });
    }

    for (const key in req.body) {
      if (key !== "bankId") {
        (bank as any)[key] = req.body[key];
      }
    }
    const updatedBank = await bank.save();
    return res.status(200).send(updatedBank);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateBankHandler;
