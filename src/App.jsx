// src/App.jsx
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Bills from "./components/Bills";
import Groceries from "./components/Groceries";
import Chores from "./components/Chores";
import Food from "./components/Food";

function App() {
  const [active, setActive] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const components = {
    Bills: <Bills userName={userName} />,
    Groceries: <Groceries userName={userName} />,
    Chores: <Chores userName={userName} />,
    Food: <Food userName={userName} />,
  };

  return (
    <Layout active={active} setActive={setActive} userName={userName} setUserName={setUserName}>
      {active && userName ? components[active] : null}
    </Layout>
  );
}

export default App;
