// src/components/Bills.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";

export default function Bills({ userName }) {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const billsRef = ref(db, "bills");
    onValue(billsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setBills(parsed);
    });
  }, []);

  const addBill = () => {
    if (!name || !amount) return;
    push(ref(db, "bills"), {
      name,
      amount: parseFloat(amount),
      addedBy: userName || "",
    });
    setName("");
    setAmount("");
  };

  const deleteBill = (id) => {
    remove(ref(db, `bills/${id}`));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Bills</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Bill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addBill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {bills.length === 0 ? (
        <p className="text-gray-500">No bills added yet.</p>
      ) : (
        <ul className="space-y-3">
          {bills.map((bill) => (
            <li
              key={bill.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded shadow-sm"
            >
              <span className="font-medium text-gray-700">
                {bill.name}: ₹{bill.amount}
              </span>
              <button
                onClick={() => deleteBill(bill.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
