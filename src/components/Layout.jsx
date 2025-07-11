// src/components/Layout.jsx
import { useState } from "react";
import { Menu } from "lucide-react";
import IdentitySelector from "./IdentitySelector";

const SECTIONS = ["Bills", "Groceries", "Chores", "Food"];

export default function Layout({ active, setActive, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header with left menu icon and title */}
      <header className="flex items-center justify-between p-4 relative">
        <button
          onClick={() => setOpen(!open)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-center w-full">
          <h1 className="text-5xl font-fancy font-bold">
            Resp<span className="italic">*</span>nsibilities 💔🥀
          </h1>
        </div>
      </header>

      {/* Dropdown Menu */}
      {open && (
        <nav className="bg-white shadow-md w-40 rounded-md ml-4 mb-6">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setActive(s);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                active === s ? "font-bold text-purple-600" : ""
              }`}
            >
              {s}
            </button>
          ))}
        </nav>
      )}

      {/* Main Body */}
      <main className="p-4 sm:p-6 max-w-3xl mx-auto text-center">
        <IdentitySelector />
        {active ? (
          children
        ) : (
          <div className="text-gray-400 italic mt-12 text-lg">
            Select a section from the menu to get started.
          </div>
        )}
      </main>
    </div>
  );
}
