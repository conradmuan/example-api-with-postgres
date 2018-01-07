require('dotenv').config();

const PORT = process.env.port || 3000;
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const _example_users = [{
  id: 1,
  name: 'johnsmith',
  access_token: '3b842bcd6faab4047ab49f9a99fa0704b9c9d2d7',
  password: 'super-secret-password'
}, {
  id: 2,
  name: 'janesmith',
  access_token: '40ab67d0840a91170a96c60614b9f72202ae22b8',
  password: 'another-super-secret-password'
}];


app.use(bodyParser.json());
app.get('/', (req, res) => res.json({ message: 'public, unauthenticated response' }));
app.post('/login', (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    return res.status(401).json({ message: 'No name or password found in the request' });
  }

  const user = _.find(_example_users, { name, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid name or password' });
  }

  const { access_token } = user;
  return res.json({ message: 'ok', access_token });

});

app.post('/secret', (req, res) => {
  const { access_token } = req.body;
  const auth = _.find(_example_users, { access_token });
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  return res.json({ message: 'Success! authorized access' });
});

app.listen(PORT, () => console.log(`Express running on ${PORT}`));