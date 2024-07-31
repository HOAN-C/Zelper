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
  const [distance, setDistance] = useState(0);
  const [opticMOA, setOpticMOA] = useState(1); // 1/n MOA : n-1 값이 들어감
  const [gropingToTargetDistance, setGropingToTargetDistance] = useState(0);
  const [result, setResult] = useState(0);
  const [perOneClick, setPerOneClick] = useState(null);

  const handleDistance = (event) => {
    const value = Number(event.target.value);
    setDistance(value);
    console.log("distance: " + value);
  };

  const handleOpticMOA = (event) => {
    const value = Number(event.target.value);
    setOpticMOA(value);
    console.log("opticMOA: " + value);
  };

  const handleGropingToTargetDistance = (event) => {
    const value = Number(event.target.value);
    setGropingToTargetDistance(value);
    console.log("gropingToTargetDistance: " + value);
  };

  const calculatePerOneClick = (distance) => {
    let oneMOA = (2.65938 * distance * 100) / 9144;
    return Math.floor(oneMOA * 100) / 100; // 소수점 두 자리 자르기
  };

  useEffect(() => {
    let roundedOneMOA = calculatePerOneClick(distance);
    console.log("oneMOA: " + roundedOneMOA);
    setPerOneClick(
      (Math.floor((roundedOneMOA / (opticMOA + 1)) * 100) / 100).toFixed(2)
    );
    setResult(gropingToTargetDistance / (roundedOneMOA / (opticMOA + 1)));
  }, [distance, opticMOA, gropingToTargetDistance]);

  return (
    <Container>
      <Header setShowDonation={setShowDonation} />
      <Main>
        <SelectionContainer>
          <Item>
            <Disc>1. 표적지까지 거리(m)</Disc>
            <Input
              placeholder="거리 입력(m 단위, 소숫점 가능)"
              type="number"
              onChange={handleDistance}
            />
          </Item>
          <Item>
            <Disc>2. 조준경 클리크당 조절 MOA(cm)</Disc>
            <Select value={opticMOA} onChange={handleOpticMOA}>
              {opticMOAList.map((MOA, index) => (
                <Option key={index} value={index}>
                  {MOA}
                </Option>
              ))}
            </Select>
            {distance !== 0 && (
              <Explanation>
                💡 1 click당 탄착군이 {perOneClick}cm 만큼 이동합니다.
              </Explanation>
            )}
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
          {distance && gropingToTargetDistance ? (
            <Explanation>{result.toFixed(0)} Click</Explanation>
          ) : (
            <Explanation>⚠️1~3번 값을 입력하세요⚠️</Explanation>
          )}
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
