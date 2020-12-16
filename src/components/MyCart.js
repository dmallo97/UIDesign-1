import React from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from "../lizard.jpg";
import { gql, useMutation, useQuery } from '@apollo/client';

const columns = [
    {
        name: 'title',
        label: 'Título',
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: 'size',
        label: 'Talle',
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'quantity',
        label: 'Cantidad en stock',
        options: {
            filter: false,
            sort: true,
        }
    },
];

const data = [
    { title: 'Buzo manga larga', size: 'M', quantity: '2', src: logo },
    { title: 'Short rojo', size: 'L', quantity: '1', src: logo },
    { title: 'Pantalon', size: 'XL', quantity: '3', src: logo },
];

/* const components = {
    ExpandButton: function (props) {
        if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{ width: '24px' }} />;
        return <ExpandButton {...props} />;
    }
}; */

const options = {
    /* filterType: "dropdown", */
    filterType: "checkbox",
    download: "false",
    print: "false",
    viewColumns: "false",
    responsive: "simple",

    /* expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
        if (dataIndex === 3 || dataIndex === 4) return false;

        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        return true;
    },
    renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    Custom expandable row option. Data: {JSON.stringify(rowData)}{rowData.title}
                </TableCell>
            </TableRow>
        );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(curExpanded, allExpanded, rowsExpanded)
 */
};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '8px',
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const PROCESS_ORDER_MUTATION = gql`
  mutation processOrder{
    processOrder{
      userId
    }
  }
`;

const REMOVE_PROD_FROM_CART_MUTATION = gql`
  mutation RemoveProductFromCart($input: CartInput!){
    removeProductFromCart(input: $input){
      userId
      products {
            id
            title
            size
            quantity
            productImage
      }
    }
  }
`;

const CART_QUERY = gql`
  query ShoppingCart{
    shoppingCart{
        userId
        products {
            id
            title
            size
            quantity
            productImage
        }
    }
  }
`;

const MyCart = () => {
    const classes = useStyles();
    const [processOrderMutation] = useMutation(PROCESS_ORDER_MUTATION);
    const [removeProductFromCartMutation] = useMutation(REMOVE_PROD_FROM_CART_MUTATION);
    //const [cartQuery] = useQuery(CART_QUERY);

    const { data } = useQuery(CART_QUERY);
    const [products, setProducts] = React.useState({
        products: data.shoppingCart.products
    });

    const processOrder = async () => {
        const { outputCart } = await processOrderMutation();
        setProducts(outputCart.shoppingCart.products); 
    };

    const onRemoveProductClick = async(event) => {
        //Falta implementacion
    }

    return (
        <>
            <MUIDataTable
                title={"Mis prendas"}
                data={products}
                columns={columns}
                options={options}
            /> {/* components={components} */}
            <div className={classes.container}>
                <Button className={classes.button} variant="contained" color="primary" onClick={processOrder}>Recibir</Button>
            </div>
        </>
    )
};

export default MyCart;