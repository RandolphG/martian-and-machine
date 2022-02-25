import React, { FC, memo } from "react";
import { usePosts } from "../../hooks";

/**
 * Post
 */
const Post: FC = memo(() => {
  const { post } = usePosts();
  return (
    <div className="post">
      <div className="post_container">
        {post.map(({ userId, title, body }: any, idx: number) => (
          <div key={idx}>
            <div>{userId}</div>
            <div>{title}</div>
            <div>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Post;
