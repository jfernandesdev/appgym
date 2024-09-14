require('dotenv').config();

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "10s"
  },
};