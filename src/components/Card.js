import React from "react";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import {AddShoppingCartIcon, DeleteIcon} from '@material-ui/icons/AddShoppingCart';
import { gql, useMutation } from '@apollo/client';
import {useHistory} from 'react-router-dom';

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: CartInput!) {
    addProductToCart(input: $input) {
      userId
      products{
        id
      }
    }
  }
`;

const REMOVE_PRODUCT_MUTATION = gql`
  mutation RemoveProduct($input: RemoveProductInput!) {
    removeProduct(input: $input) {
      userId
      products{
        id
        title
        size
        quantity
        productImage
      }
    }
  }
`;

const Card = ({ id, image, title, size, quantity }) => {
  const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);
  const [removeProductMutation] = useMutation(REMOVE_PRODUCT_MUTATION);
  let history = useHistory();

  const addToCart = async (event) => {
    const { data } = await addToCartMutation({
      variables: {
        input: {
          id
        }
      }
    });
    history.push('/myCart');
  };

  const deleteProduct = async (event) => {
    const { data } = await removeProductMutation({
      variables:{
        input:{
          productId: this.props.id
        }
      }
    });
    //redireccionar? refrescar?
  }

  return (
    <Container src={image}>
      <Image src={image} />
      <BottomContainer>

        <InfoContainer>
          <TopDescription>
            <Title>{title}</Title>
            <SizeDescription>Talle {size}</SizeDescription>
          </TopDescription>
          <Quantity>Cantidad: {quantity}</Quantity>
        </InfoContainer>

        <ButtonContainer>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={addToCart}>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="delete product" onClick={deleteProduct}>
            <DeleteIcon />
          </IconButton>
        </ButtonContainer>

      </BottomContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  min-width: 180px;
  min-height: 220px;
  box-shadow: 3px 3px 9px 1px rgba(0, 0, 0, 0.3);
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const InfoContainer = styled.div`
  padding-bottom: 0px;
  background-opacity: 0;
  align-content: space-around;
`;

const TopDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-family: "Noto Sans JP", sans-serif;
  font-weight: normal;
  margin: 0px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const BottomContainer = styled.div`
  padding: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Card;
