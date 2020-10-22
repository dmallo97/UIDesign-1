import React from 'react';
import ReactDOM from 'react-dom';
import Products from "./Products";
import 'fontsource-roboto';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => <SignIn />;

ReactDOM.render(<App />, document.getElementById('root'));

