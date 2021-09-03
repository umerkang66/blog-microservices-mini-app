import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentUrl = `http://localhost:4001/posts/${postId}/comments`;
      const commentsArr = await axios.get(commentUrl);

      setComments(commentsArr.data.data);
    };

    fetchComments();
  }, [postId]);

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <div>
      <h5>Comments</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
