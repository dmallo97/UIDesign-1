import React from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useRouteMatch } from "react-router-dom";
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
    },
  }));



const Header = ({user}) => {
    const classes = useStyles();
    let userDisplay;

    React.useEffect(() => {
      if(user)
      {
        userDisplay = <Avatar>CS</Avatar>;
      }
      else {
        userDisplay = <Button component={Link} to={'/login'} color="inherit">Ingresar</Button>;
      }
    }, user);
    
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography component={Link} to={'/products'} variant="h6" className={classes.title}>
                  Mi Ropa
                </Typography>
                <Button component={Link} to={'/account'} color="inherit">Mi cuenta. Prueba.</Button>
                {userDisplay}
            </Toolbar>
        </AppBar>
    );
}

export default Header;