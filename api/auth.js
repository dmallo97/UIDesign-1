const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "supersecrettokenwhatever";

export const generateToken = ({ _id, email, username }) =>
  jwt.sign({ _id, email, username }, TOKEN_SECRET);

export const getUserFromToken = token => jwt.verify(token, TOKEN_SECRET);
