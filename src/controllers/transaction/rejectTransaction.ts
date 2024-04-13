const rejectTransactionHandler = async (req: any, res: any) => {
  try {
    return res.status(200).send({ msg: "" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default rejectTransactionHandler;
