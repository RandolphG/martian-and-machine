import React, { useContext, useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "./assets";
import { Store } from "./store";
import "./styles.scss";

const appComponentName = "App";
const postComponentName = "Post";
const postPreviewComponentName = "Post Preview";
const blogComponentName = "Blog";
const loginComponentName = "Login";
const transition = { duration: 0.5, ease: "easeInOut" };

const postVariants = {
  initial: { y: 100, opacity: 0 },
  enter: { y: 0, opacity: 1, transition },
  exit: { y: -100, opacity: 0, transition },
};

const Post = ({ match }) => {
  const { state } = useContext(Store);
  const id = Number(match.params.id);
  const { title, body } = state.posts[id];

  useEffect(() => {
    console.log(`${state.message} <${postComponentName} component>`);
  }, []);

  return (
    <motion.div
      className="page"
      initial="exit"
      animate="enter"
      exit="exit"
      variants={postVariants}
    >
      <div className="link-wrapper">
        <Link to="/app">Back to Home page</Link>
      </div>
      <div className="post">
        <img className="post__img" src={images.image02} alt={title} />
        <h1 className="heading">{title}</h1>
        <p>{title}</p>
        <p>{body}</p>
      </div>
    </motion.div>
  );
};

const postPreviewVariants = {
  initial: { x: "100%", opacity: 0 },
  enter: { x: 0, opacity: 1, transition },
  exit: { x: "-100%", opacity: 0, transition },
};

const PostPreview = ({ id, title, body }) => {
  const { state } = useContext(Store);

  useEffect(() => {
    console.log(`${state.message} <${postPreviewComponentName} component>`);
  }, []);

  return (
    <motion.div className="post-preview" variants={postPreviewVariants}>
      <img className="post-preview__img" src={images.image03} alt={title} />
      <div className="post-preview__text">
        <h2 className="heading">{title}</h2>
        <p>{body}</p>
        <Link to={`/post/${id}`}>View post...</Link>
      </div>
    </motion.div>
  );
};

const blogVariants = {
  enter: { transition: { staggerChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.1 } },
};

const Blog = () => {
  const { state } = useContext(Store);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function onChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    console.log(`${state.message} <${blogComponentName} component>`);
  }, []);

  useEffect(() => {
    const results = state.posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="page">
      <Search
        value={searchTerm}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <motion.div
        className="blog-list"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={blogVariants}
      >
        {searchResults.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </motion.div>
    </div>
  );
};

const Login = () => {
  const [user, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { state } = useContext(Store);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/app");
  }

  function handleChange(event) {
    event.preventDefault();
    setCredentials({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    console.log(`${state.message} <${loginComponentName} component>`);
  }, []);

  return (
    <div className="loginContainer">
      <div id="wrapper">
        <div className="inputs-wrapper">
          <div className="loginInputs">
            <input
              onChange={handleChange}
              value={user.name}
              type="text"
              name="name"
              id="name"
              placeholder="name"
              autoComplete="off"
              required
            />
            <input
              onChange={handleChange}
              value={user.password}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />

            <button className="btn--login" type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search = ({ value, onChange }) => {
  return (
    <div className="search-Container">
      <form className="search-form">
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <svg className="submit-button">
            <use xlinkHref="#search" />
          </svg>
        </button>
      </form>

      <svg width="0" height="0" display="none">
        <symbol id="search" viewBox="0 0 32 32">
          <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
        </symbol>
      </svg>
    </div>
  );
};

export default function App() {
  const { state } = useContext(Store);

  useEffect(() => {
    console.log(`${state.message} <${appComponentName} component>`);
  }, []);

  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Login} />
              <Route exact path="/app" component={Blog} />
              <Route exact path="/post/:id" component={Post} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}
