// src/components/Groceries.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";

export default function Groceries() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const itemsRef = ref(db, "groceries");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setItems(parsed);
    });
  }, []);

  const addItem = () => {
    if (!input.trim()) return;
    push(ref(db, "groceries"), { name: input.trim(), bought: false });
    setInput("");
  };

  const toggleBought = (id, current) => {
    set(ref(db, `groceries/${id}/bought`), !current);
  };

  const deleteItem = (id) => {
    remove(ref(db, `groceries/${id}`));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Groceries</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Add grocery item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addItem}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No grocery items added yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded shadow-sm"
            >
              <span
                className={`font-medium ${
                  item.bought ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {item.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleBought(item.id, item.bought)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {item.bought ? "Undo" : "Bought"}
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
