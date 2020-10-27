import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Products from './Products';
import Account from './components/Account';

function App() {
  const [user, setUser] = React.useState({
    firstName: 'Cholo',
    lastName: 'Simeone',
    avatar: 'https://i0.wp.com/thesefootballtimes.co/wp-content/uploads/2018/10/simeone.png?fit=1781%2C1289&ssl=1',
    city: 'Montevideo',
    country: 'Uruguay',
    name: 'Cholo Simeone',
    email: 'cholo@simeone.com',
    ci: '5.112.546-3'
  });

  return (
    <Router>
      <Header user={user}/>
      <Route path="/login">
        <SignIn setUser={setUser}/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route path="/products">
        <Products/>
      </Route>
      <Route path="/account">
        <Account user={user, setUser}/>
      </Route>
    </Router>
  );
}

export default App;
