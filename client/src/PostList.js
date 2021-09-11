import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = ({ posts, setPosts }) => {
  const [commentStatus, setCommentStatus] = useState('firstTime');

  useEffect(() => {
    const reInvokingAndFetchingFunc = async () => {
      const fetchPosts = async () => {
        const postsUrl = 'http://localhost:4002/posts';
        const res = await axios.get(postsUrl);

        const posts = res.data.data;
        setPosts(posts);
      };

      if (commentStatus === 'firstTime') {
        await fetchPosts();
      }

      // This does not reFetching again and again because we have set the comment status to an empty string but the useEffect will only be reFetch if the comment status is equal to pending
      if (commentStatus === 'pending') {
        await fetchPosts();
        setCommentStatus('');
      }
    };

    reInvokingAndFetchingFunc();
  }, [setPosts, commentStatus]);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate
            setCommentStatus={setCommentStatus}
            posts={posts}
            setPosts={setPosts}
            postId={post.id}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
