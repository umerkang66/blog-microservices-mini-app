const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');

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
  const comments = commentsByPostId[req.params.id] || [];

  res.status(200).json({
    status: 'success',
    data: comments,
  });
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).json({
    status: 'success',
    data: comments,
  });
});

app.listen(4001, () => {
  console.log('Listening on post 4001');
});
