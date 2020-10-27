import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ user, setUser }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar className={classes.avatar} src={user.avatar}>CS</Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city}, ${user.country}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Subir una foto
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;