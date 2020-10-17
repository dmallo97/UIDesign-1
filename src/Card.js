import React from "react";
import styled from "styled-components";

const Card = ({ image, title, size }) => (
  <Container>
    <Image src={image} />

    <InfoContainer>
      <Title>{title}</Title>
      <br />
      <SizeDescription>Talle {size}</SizeDescription>
    </InfoContainer>

    <ButtonContainer>
      <Button>SHARE</Button>
      <Button>LEARN MORE</Button>
    </ButtonContainer>
  </Container>
);

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  max-height: 250px;
  box-shadow: 3px 3px 9px 1px rgba(0, 0, 0, 0.3);
  margin: auto;
  border-radius: 10px;
  overflow: hidden;

  margin-top: 200px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const InfoContainer = styled.div`
  padding: 17px;
  background-opacity: 0;
`;

const Title = styled.h1`
  font-family: "Noto Sans JP", sans-serif;
  font-weight: normal;
  margin: 0px;
`;

const SizeDescription = styled.p`
  font-family: "Noto Sans JP", sans-serif;
  color: rgb(113, 113, 113);
  margin: 0px;
`;

const ButtonContainer = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
`;

const Button = styled.button`
  margin: 8px;
  padding: 8px;
  background: white;
  border: 0px;
  color: rgb(25, 118, 210);
  font-family: "Noto Sans JP", sans-serif;
  font-weight: bold;
`;

export default Card;
