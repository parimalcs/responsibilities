// src/components/IdentitySelector.jsx
import { useState, useEffect } from "react";

const NAMES = ["Parimal", "Nitheesh", "Abhilash", "Hamza", "Aadyoth"];

export default function IdentitySelector({ onChange }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
      onChange(storedName);
    }
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    setName(selected);
    localStorage.setItem("userName", selected);
    onChange(selected);
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <label className="text-gray-700 font-semibold">Your Name:</label>
      <select
        value={name}
        onChange={handleChange}
        className="border p-2 rounded bg-white shadow"
      >
        <option value="">-- Select --</option>
        {NAMES.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
