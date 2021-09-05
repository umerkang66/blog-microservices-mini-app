import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = ({ posts, setPosts }) => {
  const [commentStatus, setCommentStatus] = useState('');

  useEffect(() => {
    const reInvokingFunc = async () => {
      const fetchPosts = async () => {
        const postsUrl = 'http://localhost:4002/posts';
        const res = await axios.get(postsUrl);

        const posts = res.data.data;
        setPosts(posts);
      };

      await fetchPosts();

      if (commentStatus === 'pending') {
        await fetchPosts();
        setCommentStatus('');
      }
    };

    reInvokingFunc();
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
