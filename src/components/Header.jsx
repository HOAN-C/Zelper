import styled from "styled-components";
import coffeeImg from "../img/icon/coffee.png";

export default function Header() {
  return (
    <Container>
      <Title>Zelper</Title>
      {/* <BiSolidDonateHeart /> */}
      <Image alt="Donation" src={coffeeImg} />
    </Container>
  );
}

const Container = styled.header`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
`;