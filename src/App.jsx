import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WeatherComponent from "./weatherComponent.jsx";
import Gallery from "./Profile.jsx";
function App() {
  const [x, y] = useState(0);
  const toggleValue = () => {
    y((prevX) => (prevX === 0 ? 1 : 0)); // 0と1を切り替え
  };
  return (
    <>
      <button onClick={toggleValue}>課題の切り替え</button>
      {x === 0 ? <WeatherComponent /> : <Gallery />}
    </>
  );
}

export default App;
