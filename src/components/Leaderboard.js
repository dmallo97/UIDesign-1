import React from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';

const USERS_QUERY = gql`
    query Users{
        users{
            firstname
            lastname
            contributions
            country
        }
    }
}`;

const columns = [
    {
        name: 'title',
        label: 'Nombre',
        options: {
            filter: false,
            sort: true,
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
        name: 'country',
        label: 'Pais',
        options: {
            filter: true,
            sort: true,
        }
    },
];

const options = {
    /* filterType: "dropdown", */
    filterType: "checkbox",
    download: "false",
    print: "false",
    viewColumns: "false",
    responsive: "simple",
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
        <>
            <Typography variant="h1">No todos los héroes llevan capa...</Typography>
            <Typography variant="h3">Estos son los que más contribuyeron a la causa.</Typography>
            <Divider />

            { loading ? <div className={classes.root}>{"Espera mientras cargamos los datos"}</div> : (
            <>
                <MUIDataTable
                    title={"Top 10 donantes"}
                    data={data.users}
                    columns={columns}
                    options={options}
                /> 
            </>)}
        </>
    );
}