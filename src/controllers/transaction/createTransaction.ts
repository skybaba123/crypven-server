import Coin from "@/models/coin";
// import Company from "@/models/company";
import Transaction from "@/models/transaction";
import User from "@/models/user";

const createTransactionHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "User not found" });

    const coin = await Coin.findById(req.body.coinId);
    if (!coin) return res.status(404).send({ error: "Coin not found" });

    // const companies = await Company.find({});
    // const company = companies[0];
    // if (!company)
    //   return res.status(404).send({ error: "Company info not found" });

    const newTransaction = new Transaction({
      priceAmount: req.body.priceAmount,
      coinId: coin._id,
      ownerId: user._id,
    });
    const savedTransaction = await newTransaction.save();
    return res.status(200).send(savedTransaction);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createTransactionHandler;