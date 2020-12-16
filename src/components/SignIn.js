import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($input: SignInInput!) {
    signIn(input: $input) {
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const user = {
  firstName: 'Cholo',
  lastName: 'Simeone',
  avatar: 'https://i0.wp.com/thesefootballtimes.co/wp-content/uploads/2018/10/simeone.png?fit=1781%2C1289&ssl=1',
  city: 'Montevideo',
  country: 'Uruguay',
  email: 'cholo@simeone.com',
  ci: '5.112.546-3',
  password: '1234'
};

export default function SignIn({ setUser }) {
  const [signInMutation] = useMutation(LOGIN_MUTATION);
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    email: 'cholo@simeone.com',
    password: '1234'
  });

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { data } = await signInMutation({
      variables: {
        input: {
          email: values.email,
          password: values.password
        }
      }
    });
    setUser(data); //de alguna manera hay que setear el usuario en la app. Imagino que data retorna el formato de un usuario y esta es la manera de setearlo
    history.push('/account');
    /*if(user.email === values.email && values.password  === user.password) //Login hardcodeado
    {
      setUser(user);
      history.push('/account');
    }*/
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresa a tu cuenta
        </Typography>
        <form name='login-form' onSubmit={handleClick} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={event =>
              setValues({
                ...values,
                email: event.target.value
              })
            }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            onChange={event =>
              setValues({
                ...values,
                password: event.target.value
              })
            }
            value={values.password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresa
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkUI href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </LinkUI>
            </Grid>
            <Grid item>
              <Link to="/signup">
                <LinkUI href="#" variant="body2">
                  {"¿No tienes cuenta? Regístrate"}
                </LinkUI>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
