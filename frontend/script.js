const API_URL = "http://localhost:5000";

async function sendMoney() {
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;
  const amount = document.getElementById("amount").value;

  const res = await fetch(`${API_URL}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sender, receiver, amount })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
}

async function loadTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  const data = await res.json();

  const list = document.getElementById("transactions");
  list.innerHTML = "";

  data.forEach(txn => {
    const li = document.createElement("li");
    li.innerText = `${txn.sender} sent ₹${txn.amount} to ${txn.receiver}`;
    list.appendChild(li);
  });
}