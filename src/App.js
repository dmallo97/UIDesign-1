import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Products from './Products';
import MyCart from './components/MyCart';

function App() {
  const [user, setUser] = React.useState();

  return (
    <Router>
      <Header />
      <Route path="/login">
        <SignIn />
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
    </Router>
  );
}

export default App;
