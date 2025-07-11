// src/components/Layout.jsx
import { useState } from "react";
import { Menu } from "lucide-react";

const SECTIONS = ["Bills", "Groceries", "Chores", "Food"];

export default function Layout({ active, setActive, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="flex items-center justify-between p-4">
        <div className="text-5xl font-fancy text-center w-full relative">
          Resp*nsibilities
          <button
            onClick={() => setOpen(!open)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

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

      <main className="p-4 sm:p-6 max-w-3xl mx-auto">
        {active ? children : (
          <div className="text-center text-gray-400 italic mt-32 text-lg">
            Select a section from the menu to get started.
          </div>
        )}
      </main>
    </div>
  );
}
