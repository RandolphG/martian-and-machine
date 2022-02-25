import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "../componenets";
import { Store } from "../context";

const componentName = "App";

export const useApp = () => {
  let navigate = useNavigate();
  const { state } = useContext(Store);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function navigateToPost(id: number) {
    navigate(`/post${id}`);
  }

  function handleSearch(event: any) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    console.log(`${state.message} <${componentName} component>`);
  }, []);

  useEffect(() => {
    const results: any = state.posts.filter((post: any) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  return { navigateToPost, searchResults, searchTerm, handleSearch };
};
