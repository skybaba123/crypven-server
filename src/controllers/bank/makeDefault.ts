import Bank from "@/models/bank";
import User from "@/models/user";
import bcrypt from "bcrypt";

const makeDefaultHandler = async (req: any, res: any) => {
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

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordMatch)
      return res.status(401).send({ error: "Password Mismatch" });

    if (bank.defaultAccount === "yes") {
      return res
        .status(400)
        .send({ error: "This is bank acount a already the default" });
    }

    await Bank.updateMany({ ownerId: user._id }, { defaultAccount: "no" });
    await Bank.findByIdAndUpdate(bank._id, { defaultAccount: "yes" });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.messge });
  }
};

export default makeDefaultHandler;
