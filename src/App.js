import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Products from './Products';
import MyCart from './components/MyCart';
import Account from './components/Account';
import styled from 'styled-components';

function App() {
  const [user, setUser] = React.useState();

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Container>
        <Route path="/login">
          <SignIn setUser={setUser} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/myCart">
          <MyCart />
        </Route>
        <PrivateRoute user={user} path="/account">
          <Account user={user} setUser={setUser} />
        </PrivateRoute>
      </Container>
    </Router>
  );
}

const PrivateRoute = ({ user, ...props }) => user ? <Route {...props} /> : <Redirect to="/login" />;
const Container = styled.div`
  padding: 24px;
`;

export default App;
