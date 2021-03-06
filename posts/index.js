const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  // Emitting the events to event-bus
  const eventUrl = 'http://event-bus-srv:4005/events';

  await axios.post(eventUrl, {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).json({
    status: 'success',
    data: posts[id],
  });
});

app.post('/events', (req, res) => {
  console.log('Receive event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v20');

  console.log('Listening on port 4000');
});
