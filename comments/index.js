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
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[postId] = comments;

  // Emitting events to event-bus
  const eventUrl = 'http://localhost:4005/events';
  const eventData = { id: commentId, postId, content, status: 'pending' };

  await axios.post(eventUrl, {
    type: 'CommentCreated',
    data: eventData,
  });

  res.status(201).json({
    status: 'success',
    data: comments,
  });
});

app.post('/events', async (req, res) => {
  console.log('Event Recieved', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => comment.id === id);
    comment.status = status;

    const eventUrl = 'http://localhost:4005/events';
    const eventData = { id, postId, content, status };

    await axios.post(eventUrl, {
      type: 'CommentUpdated',
      data: eventData,
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on post 4001');
});
