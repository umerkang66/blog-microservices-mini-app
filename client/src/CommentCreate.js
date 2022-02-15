import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId, posts, setPosts, setCommentStatus }) => {
  const [content, setContent] = useState('');

  const inputOnChange = event => {
    const content = event.target.value;
    setContent(content);
  };

  const inputOnSubmit = async event => {
    event.preventDefault();
    if (!content) return;

    const commentUrl = `http://posts.com/posts/${postId}/comments`;
    const createdComment = await axios.post(commentUrl, { content });
    setContent('');

    setPosts({
      ...posts,
      [postId]: {
        ...posts[postId],
        comments: createdComment.data.data,
      },
    });

    const newCommentArr = createdComment.data.data;
    const newComment = newCommentArr[newCommentArr.length - 1];
    setCommentStatus(newComment.status);
  };

  return (
    <div>
      <form onSubmit={inputOnSubmit}>
        <div className="form-group">
          <label htmlFor="form__input">
            <h5>New Comment</h5>
          </label>
          <input
            type="text"
            id="form__input"
            className="form-control"
            value={content}
            onChange={inputOnChange}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
