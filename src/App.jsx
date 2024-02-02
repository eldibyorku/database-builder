import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DatabaseBuilder from "./DatabaseBuilder";

function App() {
  const [count, setCount] = useState(0);

  return <DatabaseBuilder />;
}

export default App;
