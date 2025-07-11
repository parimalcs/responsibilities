// src/components/Chores.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set, remove, update } from "firebase/database";
import { format } from "date-fns";

const CHORES = ["Dishes", "Clean Floor", "Trash", "Dusting", "Organize"];

export default function Chores({ userName }) {
  const [assignments, setAssignments] = useState({});
  const [lastWeek, setLastWeek] = useState({});

  const currentWeek = format(new Date(), "yyyy-'W'II"); // e.g., 2025-W28

  useEffect(() => {
    const currentRef = ref(db, "chores/current");
    const historyRef = ref(db, `chores/history/${getPreviousWeek()}`);

    onValue(currentRef, (snap) => {
      if (snap.exists()) setAssignments(snap.val());
    });

    onValue(historyRef, (snap) => {
      if (snap.exists()) setLastWeek(snap.val());
    });
  }, []);

  const getPreviousWeek = () => {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    return format(now, "yyyy-'W'II");
  };

  const handleSelect = (chore) => {
    if (!userName) return;
    const updated = { ...assignments, [userName]: { task: chore, completed: false } };
    set(ref(db, "chores/current"), updated);
  };

  const handleLock = () => {
    if (!userName) return;
    update(ref(db, `chores/history/${currentWeek}`), {
      [userName]: assignments[userName]?.task || "",
    });
  };

  const handleReset = () => {
    remove(ref(db, "chores/current"));
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Chores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHORES.map((chore) => {
          const takenBy = Object.entries(assignments).find(
            ([, val]) => val.task === chore
          )?.[0];
          const isLastWeek = lastWeek[userName] === chore;
          return (
            <button
              key={chore}
              disabled={takenBy && takenBy !== userName || isLastWeek}
              onClick={() => handleSelect(chore)}
              className={`p-3 rounded border text-left ${
                takenBy === userName
                  ? "bg-blue-100 border-blue-400"
                  : takenBy
                  ? "bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed"
                  : isLastWeek
                  ? "bg-yellow-100 border-yellow-400 text-yellow-600 cursor-not-allowed"
                  : "bg-white hover:bg-blue-50 border-gray-300"
              }`}
            >
              <div className="font-semibold">{chore}</div>
              <div className="text-sm">
                {takenBy
                  ? takenBy === userName
                    ? "You selected this"
                    : `Taken by ${takenBy}`
                  : isLastWeek
                  ? "You did this last week"
                  : "Available"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleLock}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Lock Week
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset Week
        </button>
      </div>
    </div>
  );
}
