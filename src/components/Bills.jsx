// src/components/Bills.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";

export default function Bills({ userName }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [bills, setBills] = useState([]);

  const billsRef = ref(db, "bills");

  useEffect(() => {
    const unsubscribe = onValue(billsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        setBills(list);
      } else {
        setBills([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    if (!name || !amount || isNaN(amount)) return;
    push(billsRef, { name, amount: parseFloat(amount) });
    setName("");
    setAmount("");
  };

  const handleDelete = (id) => {
    remove(ref(db, `bills/${id}`));
  };

  const total = bills.reduce((sum, b) => sum + Number(b.amount), 0);
  const perPerson = total / 5;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">💸 Bills</h2>

      <div className="flex gap-2">
        <input
          placeholder="Bill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {bills.map((bill) => (
          <li
            key={bill.id}
            className="flex justify-between items-center bg-white shadow rounded p-2"
          >
            <span className="font-medium text-gray-700">{bill.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">₹{bill.amount}</span>
              <button
                onClick={() => handleDelete(bill.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t text-lg text-gray-700 font-semibold">
        Total: ₹{total.toFixed(2)} | Each Person Pays: ₹{perPerson.toFixed(2)}
      </div>
    </div>
  );
}
