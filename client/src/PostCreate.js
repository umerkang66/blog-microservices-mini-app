import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const inputOnChange = event => {
    const title = event.target.value;
    setTitle(title);
  };

  const inputOnSubmit = async event => {
    event.preventDefault();

    const postUrl = 'http://localhost:4000/posts';
    const createdPost = await axios.post(postUrl, { title });
    setTitle('');

    console.log(createdPost.data.data);
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
