// src/components/Food.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Lunch", "Dinner"];

export default function Food() {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    const planRef = ref(db, "food");
    onValue(planRef, (snapshot) => {
      setPlan(snapshot.val() || {});
    });
  }, []);

  const updateMeal = (day, meal, value) => {
    set(ref(db, `food/${day}/${meal}`), value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Weekly Food Planner</h2>

      <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-orange-100">
              <th className="border px-4 py-2 text-left">Day</th>
              {MEALS.map((meal) => (
                <th key={meal} className="border px-4 py-2 text-left">
                  {meal}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day} className="even:bg-gray-50">
                <td className="border px-4 py-2 font-medium text-gray-700">{day}</td>
                {MEALS.map((meal) => (
                  <td key={meal} className="border px-4 py-2">
                    <input
                      type="text"
                      value={plan[day]?.[meal] || ""}
                      onChange={(e) => updateMeal(day, meal, e.target.value)}
                      placeholder={`Enter ${meal}`}
                      className="w-full border p-1 rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
