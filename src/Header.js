import React from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white'
  },
  link: {
    padding: theme.spacing(1),
    textDecoration: 'none',
    color: 'white'
  }
}));



const Header = ({ logo, user }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography component={Link} to={'/products'} variant="h6" className={classes.title}>
          Mi Ropa
        </Typography>
        <Button component={Link} to={'/login'} color="inherit">Login</Button>
        <Link className={classes.link} to={'/myCart'}>
          <ShoppingCartIcon />
        </Link>
        {/* <Button component={Link} to={'/myCart'} color="inherit">Mi Carrito</Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;