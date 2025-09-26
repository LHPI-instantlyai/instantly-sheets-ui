import { useState } from "react";

import "./App.css";
import Home from "./views/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen">
      <Home />
    </div>
  );
}

export default App;
