// src/components/Chores.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set, remove } from "firebase/database";
import { format } from "date-fns";

const CHORES = [
  { task: "Dishes 🍽️", key: "dishes" },
  { task: "Clean Floor 🧹", key: "floor" },
  { task: "Trash 🗑️", key: "trash" },
  { task: "Dusting 🧽", key: "dust" },
  { task: "Organize 📦", key: "organize" },
];

export default function Chores() {
  const [chores, setChores] = useState({});
  const [locked, setLocked] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    const choresRef = ref(db, "chores");
    const lockRef = ref(db, "choresLocked");

    onValue(choresRef, (snap) => setChores(snap.val() || {}));
    onValue(lockRef, (snap) => setLocked(!!snap.val()));
  }, []);

  const handleSelect = (choreKey) => {
    if (!user || locked) return;
    const alreadyTaken = Object.values(chores).some(
      (entry) => entry.assignedTo === user
    );
    if (alreadyTaken) return;

    set(ref(db, `chores/${choreKey}`), {
      task: choreKey,
      assignedTo: user,
      completed: false,
      date: format(new Date(), "yyyy-MM-dd"),
    });
  };

  const handleLock = () => set(ref(db, "choresLocked"), true);

  const handleReset = () => {
    remove(ref(db, "chores"));
    remove(ref(db, "choresLocked"));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">Weekly Chores</h2>

      {user && (
        <div className="text-sm text-gray-600 mb-4">
          Logged in as: <span className="font-medium">{user}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {CHORES.map(({ task, key }) => {
          const entry = chores[key];
          const assigned = entry?.assignedTo || "—";

          return (
            <button
              key={key}
              disabled={locked || !!entry}
              onClick={() => handleSelect(key)}
              className={`flex justify-between items-center p-4 rounded-lg border
                ${entry
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-purple-50 border-purple-300"}
              `}
            >
              <span className="font-medium">{task}</span>
              <span className="text-sm text-purple-700">{assigned}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleLock}
          className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
        >
          Lock Week
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Reset Week
        </button>
      </div>
    </div>
  );
}
