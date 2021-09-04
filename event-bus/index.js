const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const urlGenerator = port => `http://localhost:${port}/events`;

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post(urlGenerator(4000), event);
  axios.post(urlGenerator(4001), event);
  axios.post(urlGenerator(4002), event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
