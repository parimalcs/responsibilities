// src/components/Layout.jsx
import { useState } from "react";
import IdentitySelector from "./IdentitySelector";
import { Menu } from "lucide-react";

const navItems = ["Bills", "Groceries", "Chores", "Food"];
const names = ["Parimal", "Nitheesh", "Abhilash", "Hamza", "Aadyoth"];

const Layout = ({ active, setActive, userName, setUserName, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="flex justify-between items-center p-4 border-b border-gray-300 relative">
        <div className="absolute left-4">
          <IdentitySelector userName={userName} setUserName={setUserName} names={names} />
        </div>
        <h1 className="text-2xl font-bold text-center w-full">
          Resp*nsibilities 💔🥀
        </h1>
        <div className="absolute right-4">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="flex justify-center gap-4 py-4 border-b border-gray-200">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActive(item);
                setMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                active === item ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      )}

      <main className="p-4 max-w-3xl mx-auto w-full">{children}</main>
    </div>
  );
};

export default Layout;
