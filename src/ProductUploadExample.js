import React from "react";
import styled from "styled-components";
import ProductUpload from "./components/ProductUpload";

const ProductUploadExample = () => (
    <Container>
        <ProductUpload />
    </Container>
);

const Container = styled.div`
    padding: 24px;
    
    justify-content: center;
    align-content: center;
`;

export default ProductUploadExample;