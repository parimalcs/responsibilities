// src/App.jsx
import { useState } from "react";
import Layout from "./components/Layout";
import Bills from "./components/Bills";
import Groceries from "./components/Groceries";
import Chores from "./components/Chores";
import Food from "./components/Food";
import IdentitySelector from "./components/IdentitySelector";

function App() {
  const [active, setActive] = useState(""); // selected section (Bills, Groceries, etc.)
  const [userName, setUserName] = useState("");

  const renderSection = () => {
    switch (active) {
      case "Bills":
        return <Bills userName={userName} />;
      case "Groceries":
        return <Groceries userName={userName} />;
      case "Chores":
        return <Chores userName={userName} />;
      case "Food":
        return <Food userName={userName} />;
      default:
        return null;
    }
  };

  return (
    <Layout active={active} setActive={setActive}>
      <IdentitySelector onChange={setUserName} />
      {renderSection()}
    </Layout>
  );
}

export default App;
