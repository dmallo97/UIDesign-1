import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

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
  avatar: {
    textDecoration: 'none',
    marginRight: theme.spacing(2),
  }
}));



const Header = ({ user, setUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    setUser(null);
    history.push('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography component={Link} to={'/products'} variant="h6" className={classes.title}>
          Mi Ropa
                </Typography>
        {user ? <Avatar className={classes.avatar} component={Link} to={'/account'} src={user.avatar}>CS</Avatar> : <Button component={Link} to={'/login'} color="inherit">Ingresar</Button>}
        {user ? <Button onClick={handleClick} color="inherit">Salir</Button> : <></>}
        {user ? <Link className={classes.link} to={'/myCart'}>
          <ShoppingCartIcon />
        </Link> : <></>}
      </Toolbar>
    </AppBar>
  );
}

export default Header;