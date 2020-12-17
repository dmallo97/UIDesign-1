import React from "react";
import styled from "styled-components";
import Card from "./components/Card";
import logo from "./lizard.jpg";
import { gql, useQuery } from "@apollo/client";

const PRODUCTS_QUERY = gql`
  query Products{
    products{
      id
      title
      size
      quantity
      productImage
    }
  }
`;

const ProductsCatalog = () => {
  const { data , loading } = useQuery(PRODUCTS_QUERY);
  const [products, setProducts] = React.useState([]);
  if(loading)
  {
    return "Aguarde un momento";
  }
  /*if(data)
  {
    setProducts(data.products);
  }*/
  
  return (
    <Container>
      {data.products.map(product => (
        <Card
        id={product.id}
        image={logo}
        title={product.title}
        size={product.size}
        quantity={product.quantity}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  padding: 24px;
  column-gap: 24px;
  row-gap: 32px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export default ProductsCatalog;
