import React from 'react';
import PostPreviewSkeleton from './PostPreviewSkeleton';

function PostsLoading() {
  return (
    <React.Fragment>
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
    </React.Fragment>
  );
}

export default PostsLoading;
