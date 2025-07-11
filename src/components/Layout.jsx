// src/components/Layout.jsx
import { useState } from "react";

const navItems = ["Bills", "Groceries", "Chores", "Food"];
const names = ["Parimal", "Nitheesh", "Abhilash", "Hamza", "Aadyoth"];

export default function Layout({ children, active, setActive, userName, setUserName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4 border-b">
        {/* Center: Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-center">
          Resp*nsibilities 💔🥀
        </div>

        {/* Left: Dropdown in center area */}
        <div className="flex-grow flex justify-center">
          <label className="mr-2 text-sm mt-[2px]">You are:</label>
          <select
            value={userName}
            onChange={handleNameChange}
            className="border p-1 text-sm"
          >
            <option value="">Select your name</option>
            {names.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Right: Hamburger menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl border p-1">
            ☰
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow rounded">
              {navItems.map((item) => (
                <div
                  key={item}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${active === item ? 'font-bold' : ''}`}
                  onClick={() => {
                    setActive(item);
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl p-4">
        {children ? children : (
          <p className="text-center italic mt-8 text-gray-500">
            Select a section from the menu to get started.
          </p>
        )}
      </div>
    </div>
  );
}
