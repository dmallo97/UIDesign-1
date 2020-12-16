import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UserInput!) {
    updateUser(input: $input) {
      id
      firstname
      token
      lastname
      city
      country
      email
      dni
      password
    }
  }
`;

const cities = [
  {
    value: 'montevideo',
    label: 'Montevideo'
  },
  {
    value: 'las-piedras',
    label: 'Las Piedras'
  },
  {
    value: 'ciudad-de-la-costa',
    label: 'Ciudad de la Costa'
  },
  {
    value: 'punta-del-este',
    label: 'Punta del Este'
  },
  {
    value: 'colonia-del-sacramento',
    label: 'Colonia del Sacramento'
  },
  {
    value: 'rivera',
    label: 'Rivera'
  }
];

const ProfileDetails = ({ user, setUser }) => {
  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    ci: user.ci,
    city: user.city,
    country: user.country
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    /*setUser({
      ...values,
    });*/
    const firstname = values.firstName;
    const lastname = values.lastName;
    const email = values.email;
    const city = values.city;
    const { data } = await updateUserMutation({ //que hago con el resultado?
      variables: {
        input: {
          firstname,
          lastname,
          email,
          city
        }
      }
    });
    setUser({ data });
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleClick}
    >
      <Card>
        <CardHeader
          subheader="La información puede ser editada"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Apellido"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="C.I"
                name="ci"
                onChange={handleChange}
                value={values.ci}
                /*InputProps={{
                  readOnly: true
                }}*/
                disabled
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="País"
                name="country"
                onChange={handleChange}
                disabled
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Seleccione una ciudad"
                name="city"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.city}
                variant="outlined"
              >
                {cities.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Guardar datos
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;