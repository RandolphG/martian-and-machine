import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../context";

const componentName = "Post";

export const usePosts = () => {
  const { state } = useContext(Store);
  const { id } = useParams<"id">();

  const post = state.posts.filter((post: any) => {
    return `${post.id}` === id;
  });

  useEffect(() => {
    console.log(`${state.message} <${componentName} component>`);
  }, []);

  return {
    post,
  };
};
