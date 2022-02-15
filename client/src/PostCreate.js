import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = ({ posts, setPosts }) => {
  const [title, setTitle] = useState('');

  const inputOnChange = event => {
    const title = event.target.value;
    setTitle(title);
  };

  const inputOnSubmit = async event => {
    event.preventDefault();
    if (!title) return;

    const postUrl = 'http://posts.com/posts/create';
    const createdPost = await axios.post(postUrl, { title });
    setTitle('');

    const newPost = createdPost.data.data;
    setPosts({ ...posts, [newPost.id]: { ...newPost, comments: [] } });
  };

  return (
    <div className="post-create">
      <form onSubmit={inputOnSubmit}>
        <div className="form-group">
          <label htmlFor="form-input">Title</label>
          <input
            type="text"
            className="form-control"
            id="form-input"
            value={title}
            onChange={inputOnChange}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
