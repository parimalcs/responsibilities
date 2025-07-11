import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, push, remove } from "firebase/database";

export default function Food() {
  const [meal, setMeal] = useState("");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const foodRef = ref(db, "food");
    onValue(foodRef, (snap) => {
      const data = snap.val() || {};
      const formatted = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
      }));
      setMeals(formatted);
    });
  }, []);

  const handleAdd = () => {
    if (meal.trim()) {
      push(ref(db, "food"), { name: meal.trim() });
      setMeal("");
    }
  };

  const handleDelete = (id) => {
    remove(ref(db, `food/${id}`));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-700">Food Planner</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          placeholder="e.g. Biriyani for Dinner"
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleAdd}
          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {meals.map(({ id, name }) => (
          <li
            key={id}
            className="flex justify-between items-center bg-rose-50 border border-rose-200 rounded p-2"
          >
            <span>{name}</span>
            <button
              onClick={() => handleDelete(id)}
              className="text-sm text-rose-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
