// src/components/IdentitySelector.jsx
import { useEffect, useState } from "react";

const IdentitySelector = ({ selectedName, setSelectedName }) => {
  const names = ["Parimal", "Nitheesh", "Abhilash", "Hamza", "Aadyoth"];

  useEffect(() => {
    const stored = localStorage.getItem("flatmateName");
    if (stored) setSelectedName(stored);
  }, []);

  const handleChange = (e) => {
    const name = e.target.value;
    setSelectedName(name);
    localStorage.setItem("flatmateName", name);
  };

  return (
    <div className="text-sm mt-2">
      <label className="mr-2 font-semibold text-gray-700">You are:</label>
      <select
        value={selectedName}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">Select your name</option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IdentitySelector;
