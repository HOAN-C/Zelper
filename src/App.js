import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styled from "styled-components";

export default function App() {
  const opticMOAList = [
    "1 MOA",
    "1/2 MOA",
    "1/3 MOA",
    "1/4 MOA",
    "1/5 MOA",
    "1/6 MOA",
    "1/7 MOA",
    "1/8 MOA",
  ];

  const [showDonation, setShowDonation] = useState(false);

  const [distance, setDistance] = useState(10);
  const [opticMOA, setOpticMOA] = useState(0); // 1/n MOA : n-1 값이 들어감
  const [gropingToTargetDistance, setGropingToTargetDistance] = useState(0);
  const [result, setResult] = useState(0);
  const [perOneClick, setPerOneClick] = useState(null);

  const handleOpticMOA = (event) => {
    setOpticMOA(Number(event.target.value));
  };

  const handleDistance = (event) => {
    setDistance(Number(event.target.value));
  };

  const handleGropingToTargetDistance = (event) => {
    setGropingToTargetDistance(Number(event.target.value));
  };

  useEffect(() => {
    let oneMOA = (2.65938 * distance * 100) / 9144; // 1MOA를 움직일 때 마다 입력한 distance에서 변하는 거리
    let roundedOneMOA = Number(oneMOA.toFixed(2));
    console.log("oneMOA: " + roundedOneMOA);
    setPerOneClick((roundedOneMOA / (opticMOA + 1)).toFixed(2));
    setResult(0);
  }, [distance, opticMOA, gropingToTargetDistance]);

  return (
    <Container>
      <Header setShowDonation={setShowDonation}></Header>
      <Main>
        <SelectionContainer>
          <Item>
            <Disc>1. 표적지까지 거리</Disc>
            <Input
              placeholder="거리 입력(m 단위, 소숫점 가능)"
              type="number"
              onChange={handleDistance}
            />
          </Item>
          <Item>
            <Disc>2. 조준경 클리크당 조절 MOA</Disc>
            <Select value={opticMOA} onChange={handleOpticMOA}>
              {opticMOAList.map((MOA, index) => (
                <Option key={index} value={index}>
                  {MOA}
                </Option>
              ))}
            </Select>
            <Explanation>
              1 click당 탄착군이 {perOneClick}cm 만큼 이동합니다.
            </Explanation>
          </Item>
          <Item>
            <Disc>3. 탄착군 - 목표 거리</Disc>
            <Input
              placeholder="거리 입력(cm 단위, 소숫점 가능)"
              type="number"
              onChange={handleGropingToTargetDistance}
            />
          </Item>
        </SelectionContainer>
        <Item>
          <Disc>조절 클리크</Disc>
          {result}
        </Item>
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
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  margin-bottom: 20px;
`;

const Disc = styled.div`
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const Input = styled.input`
  font-size: 18px;
  width: 50%;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const Option = styled.option`
  font-size: 16px;
`;

const Explanation = styled.div`
  padding-top: 10px;
  color: gray;
`;
