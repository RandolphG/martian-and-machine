import React, { FC, memo } from "react";
import { useApp } from "../../hooks";
import { Search } from "../Search";
import "./_appStyles.scss";

/**
 * Application
 */
const App: FC = memo(() => {
  const { navigateToPost, searchTerm, searchResults, handleSearch } = useApp();

  return (
    <div className="posts">
      <div id="list-search">
        <Search
          value={searchTerm}
          onChange={(e: any) => {
            handleSearch(e);
          }}
        />
      </div>

      <div className="postContainer">
        <div className="grid-row">
          {searchResults.map((post: any, idx: number) => (
            <div key={idx} className="grid-item">
              <div className="grid-item-wrapper">
                <div className="grid-item-container">
                  <div className="grid-image-top rex-ray">
                    <span className="centered project-image-bg rex-ray-image" />
                  </div>
                  <div className="grid-item-content">
                    <span className="item-title">userId : {post.userId}</span>
                    <span className="item-category">title: {post.title}</span>

                    <span
                      className="more-info"
                      onClick={() => navigateToPost(post.id)}
                    >
                      View Post
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default App;
