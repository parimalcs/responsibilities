// src/components/Food.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Lunch", "Dinner"];

export default function Food({ userName }) {
  const [foodPlan, setFoodPlan] = useState({});

  const foodRef = ref(db, "food");

  useEffect(() => {
    const unsubscribe = onValue(foodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFoodPlan(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (day, meal, value) => {
    const updated = {
      ...foodPlan,
      [day]: {
        ...foodPlan[day],
        [meal]: value,
      },
    };
    setFoodPlan(updated);
    set(foodRef, updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">🍽️ Food Planner</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Day</th>
              {MEALS.map((meal) => (
                <th key={meal} className="p-2">{meal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day} className="border-t">
                <td className="p-2 font-medium text-gray-700">{day}</td>
                {MEALS.map((meal) => (
                  <td key={meal} className="p-2">
                    <input
                      type="text"
                      value={foodPlan?.[day]?.[meal] || ""}
                      onChange={(e) => handleChange(day, meal, e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                      placeholder={`Enter ${meal}`}
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
