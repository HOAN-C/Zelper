import React, { useState } from "react";
import Header from "./components/Header";
import styled from "styled-components";

export default function App() {
  const opticMOAList = ["1 MOA", "1/2 MOA", "1/4 MOA"];

  const [showDonation, setShowDonation] = useState(false);

  const [opticMOA, setOpticMOA] = useState(opticMOAList[1]);
  const [distance, setDistance] = useState(10);
  const [gropingToTargetDistance, setGropingToTargetDistance] = useState(0);
  const [result, setResult] = useState(0);

  const handleOpticMOAChange = (event) => {
    setOpticMOA(event.target.value);
  };

  return (
    <Container>
      <Header setShowDonation={setShowDonation}></Header>
      <Main>
        <SelectionContainer>
          <Selection>
            <Disc>표적지 거리</Disc>
            <input placeholder="거리 입력(m, 소숫점 가능)" type="number" />
          </Selection>
          <Selection>
            <Disc>조준경 클리크</Disc>
            <Select value={opticMOA} onChange={handleOpticMOAChange}>
              {opticMOAList.map((MOA, index) => (
                <Option key={index} value={MOA}>
                  {MOA}
                </Option>
              ))}
            </Select>
          </Selection>
          <Selection>
            <Disc>탄착군 거리</Disc>
            <input
              placeholder="탄착군 거리 입력(cm, 소숫점 가능)"
              type="number"
            />
          </Selection>
        </SelectionContainer>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Main = styled.main`
  margin-top: 5vh;
  height: 80vh;
  border: 1px solid red;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Selection = styled.div`
  border: 1px solid red;
  margin-bottom: 20px;
`;

const Disc = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const Option = styled.option`
  font-size: 16px;
`;
