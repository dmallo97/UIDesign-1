import React from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from '@apollo/client';
import { Typography, Divider, Container } from '@material-ui/core';

const USERS_QUERY = gql`
    query Users{
        users{
            firstname
            lastname
            contributions
            city
            country
        }
    }
`;

const columns = [
    {
        name: 'firstname',
        label: 'Nombre',
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: 'lastname',
        label: 'Apellido',
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: 'contributions',
        label: 'Cantidad de donaciones',
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'city',
        label: 'Ciudad',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'country',
        label: 'País',
        options: {
            filter: false,
            sort: false,
        }
    },
];

const options = {
    filterType: "dropdown",
    //filterType: "checkbox",
    download: "false",
    print: "false",
    viewColumns: "false",
    responsive: "simple",
    selectableRows: "false",
    count: 10,
};

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }));


const Leaderboard = () => {
    const { data , loading } = useQuery(USERS_QUERY);
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            <Typography variant="h3">No todos los héroes llevan capa...</Typography>
            <Typography variant="h5">Estos son los que más contribuyeron a la causa.</Typography>
            <br></br>
            <Divider />
            <br></br>
            { loading ? <div className={classes.root}>{"Espera mientras cargamos los datos"}</div> : (
            <>
                <MUIDataTable
                    title={"Top 10 donantes"}
                    data={data.users}
                    columns={columns}
                    options={options}
                /> 
            </>)}
        </Container>
    );
}

export default Leaderboard;