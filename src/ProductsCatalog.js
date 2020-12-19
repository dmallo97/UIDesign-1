import React from "react";
import styled from "styled-components";
import Card from "./components/Card";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const ProductsCatalog = () => {
  const { data , loading, refetch } = useQuery(PRODUCTS_QUERY);
  React.useEffect(() => {
    refetch();
  }, [refetch]);
  const classes = useStyles();
  
  return (
    <Container>
      { loading ? <div className={classes.root}>{"Espera mientras cargamos los datos"}</div> : (<>
        {data.products.map(product => (
          
          <Card
          id={product.id}
          image={product.productImage}
          title={product.title}
          size={product.size}
          quantity={product.quantity}
          />
        ))}
      </>)}
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
