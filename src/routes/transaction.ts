import createTransactionHandler from "@/controllers/transaction/createTransaction";
import deleteTransactionHandler from "@/controllers/transaction/deleteTransaction";
import getAllTransactionsHandler from "@/controllers/transaction/getAllTransactions";
import getTransactionHandler from "@/controllers/transaction/getTransaction";
import getUserTransactionsHandler from "@/controllers/transaction/getUserTransactions";
import updateTransactionHandler from "@/controllers/transaction/updateTransaction";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/transaction/create", userAuth, createTransactionHandler);

router.get("/transactions", userAuth, getAllTransactionsHandler);

router.post("/transactions/user", userAuth, getUserTransactionsHandler);

router.post("/transaction", userAuth, getTransactionHandler);

router.post("/transaction/update", userAuth, updateTransactionHandler);

router.post("/transaction/delete", userAuth, deleteTransactionHandler);

export default router;
