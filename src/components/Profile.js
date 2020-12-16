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
      profileImage
    }
  }
`;

const useStyles = makeStyles(() => ({
  avatar: {
    height: 100,
    width: 100
  },
  input: {
      display: 'none',
      margin: '8px',
      minWidth: '150px',
  }
}));

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const Profile = ({ user, setUser }) => {
  const classes = useStyles();
  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
  const [avatar, setAvatar] = React.useState({
    avatar: user.profileImage,
    raw: ''
  })

  const handleImageChange = async (event) => {
    if(event.target.files.length){
      const file = event.target.files[0];
      const result = await toBase64(file).catch(e => Error(e));
      setAvatar({
          avatar: URL.createObjectURL(event.target.files[0]),
          raw: result
      });
    }
    const { data } = await updateUserMutation({
      variables: {
        input: {
          profileImage: avatar.raw
        }
      }
    })
    setUser(data.updateUser);
    console.log("Imagen seleccionada: "+ avatar.raw);
  }


  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          {avatar.avatar ? <Avatar className={classes.avatar} src={avatar.avatar} /> : <Avatar>?</Avatar>}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${user.firstname} ${user.lastname}`}
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
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Subir una foto
          </Button>
        </label>
        
      </CardActions>
    </Card>
  );
};

export default Profile;