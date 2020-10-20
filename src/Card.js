import React from "react";
import styled from "styled-components";

const Card = ({ image, title, size, quantity }) => (
  <Container src={image}>
    <Image src={image} />

    <InfoContainer>
      <TopDescription>
        <Title>{title}</Title>
        <SizeDescription>Talle {size}</SizeDescription>
      </TopDescription>
      <Quantity>Cantidad: {quantity}</Quantity>
    </InfoContainer>

    <ButtonContainer>
      <Button>Agregar</Button>
    </ButtonContainer>
  </Container>
);

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  min-width: 180px;
  min-height: 220px;
  ${'' /* max-height: 250px; */}
  box-shadow: 3px 3px 9px 1px rgba(0, 0, 0, 0.3);
  margin: auto;
  border-radius: 10px;
  overflow: hidden;

  ${'' /*   background-image: ${(props) => props.theme.primary.main}; */}
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const InfoContainer = styled.div`
  padding: 16px;
  padding-bottom: 0px;
  background-opacity: 0;
  align-content: space-around;
`;

const TopDescription = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
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

const Quantity = styled.p`
  font-family: "Noto Sans JP", sans-serif;
  color: rgb(113, 113, 113);
  margin: 0px;
`;

const ButtonContainer = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: flex-end;
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
