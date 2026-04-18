const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let transactions = [
  { sender: "Nikhil", receiver: "Ravi", amount: 500 },
  { sender: "Madhu", receiver: "Sita", amount: 250 }
];

app.get("/", (req, res) => {
  res.send("UPI Backend Running");
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/send", (req, res) => {
  const { sender, receiver, amount } = req.body;

  if (!sender || !receiver || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const txn = { sender, receiver, amount };
  transactions.push(txn);

  res.json({ message: "Payment Successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});