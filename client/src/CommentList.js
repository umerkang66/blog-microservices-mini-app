import React from 'react';

const CommentList = ({ comments }) => {
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
