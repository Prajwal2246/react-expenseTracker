import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [transaction, setTransaction] = useState([]);
  const [description, setDescription] = useState("");

  function handleClick() {
    const numericAmount = parseFloat(amount);

    if (
      isNaN(numericAmount) ||
      numericAmount <= 0 ||
      description.trim() === ""
    ) {
      alert("enter a valid amount and description");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: numericAmount,
      description: description.trim(),
    };

    setTransaction((prev) => [newTransaction, ...prev]);

    if (type === "income") {
      setIncome((prev) => prev + numericAmount);
      setBalance((prev) => prev + numericAmount);
    } else {
      setExpense((prev) => prev + numericAmount);
      setBalance((prev) => prev - numericAmount);
    }

    setAmount("");
    setDescription("");
  }
  function handleDelete(id){
    const deleteTransaction = transaction.find(td=>td.id===id);
    if(!deleteTransaction) return;
    const updatedList = transaction.filter(txn => txn.id !== id);
    setTransaction(updatedList);

    if(deleteTransaction.type === "income"){
      setIncome(prev => prev - deleteTransaction.amount);
      setBalance(prev=>prev-deleteTransaction.amount)
    }else{
      setExpense(prev=>prev-deleteTransaction.amount);
      setBalance(prev=>prev+deleteTransaction.amount)
    }

  }

  return (
    <div className="main">
      <div className="balance-div">
        <strong>Balance:</strong> {balance}
        <br />
      </div>
      <div className="income-expense">
        <strong>Income:</strong> {income}
        <strong>Expense:</strong> {expense}
      </div>
      <div className="trnxaddDel-div"></div>
      <input
        type="number"
        placeholder="enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button onClick={handleClick}>Add </button>
      <ol className="transaction-list">
        <h3>Transactions</h3>
        {transaction.map((txn) => (
          <li
            key={txn.id}
            className={txn.type === "income" ? "txn income" : "txn expense"}
          >
            <span>
              {txn.type === "income" ? "+" : "-"} {txn.description}
            </span>
            <span>
              {txn.type === "income" ? "+" : "-"}${txn.amount.toFixed(2)}
            </span>
            <button onClick={()=>handleDelete(txn.id)} style={{color:"red"}}>X</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
