import React, { useState, Fragment } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import "./App.css";

function App() {
  const opticMOAList = ["1", "1/2", "1/4"];

  const [donation, setDonation] = useState(false);
  const [opticMOA, setOpticMOA] = useState(opticMOAList[1]);
  const [distance, setDistance] = useState(10);
  const [unit, setUnit] = useState("m");
  const [targetPosition, setTargetPosition] = useState([0, 0]);

  return (
    <div className="container">
      <Fragment>
        <Header setDonation={setDonation} />
        <Body
          opticMOAList={opticMOAList}
          opticMOA={opticMOA}
          setOpticMOA={setOpticMOA}
          distance={distance}
          setDistance={setDistance}
          unit={unit}
          setUnit={setUnit}
          targetPosition={targetPosition}
          setTargetPosition={setTargetPosition}
        />
      </Fragment>
    </div>
  );
}

export default App;
