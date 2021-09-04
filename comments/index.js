const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/comments', (req, res) => {
  res.status(201).json({
    status: 'success',
    data: commentsByPostId,
  });
});

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  res.status(200).json({
    status: 'success',
    data: comments,
  });
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  // Emitting events to event-bus
  const eventUrl = 'http://localhost:4005/events';
  const eventData = { id: commentId, postId, content };

  await axios.post(eventUrl, {
    type: 'CommentCreated',
    data: eventData,
  });

  res.status(201).json({
    status: 'success',
    data: comments,
  });
});

app.post('/events', (req, res) => {
  console.log('Event Recieved', req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on post 4001');
});
