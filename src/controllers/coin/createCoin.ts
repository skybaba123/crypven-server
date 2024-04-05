import Coin from "@/models/coin";
import User from "@/models/user";

const createCoinHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user_id);
    if (!requester)
      return res.status(404).send({ error: "User(requester) not found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const newCoin = new Coin({
      label: req.body.label,
      value: req.body.value,
      walletAddress: req.body.walletAddress,
      minAmount: req.body.minAmount,
      info: req.body.info,
    });

    const savedCoin = await newCoin.save();
    return res.status(200).send(savedCoin);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createCoinHandler;
