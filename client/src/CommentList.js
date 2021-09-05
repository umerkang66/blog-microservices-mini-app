import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content;

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation...';
        break;
      case 'rejected':
        content = 'This comment is rejected';
        break;
      default:
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      <h5>Comments</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
