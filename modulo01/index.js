const express = require('express');

const server = express();
//Query params = ?test=1
//Route params = /users/1
//Request body = {"name": "Diego", "email": "user@gmail.com"}
//localhost:3000/test

const users = ['Dalto', 'Tonho', 'Lubiana'];

server.get('/users/:index', (req, res) => {
  const {index} = req.params;

  return res.json(users[index]);
})

server.listen(3000);