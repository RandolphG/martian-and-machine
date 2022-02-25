import React from "react";
import "./loginStyles.scss";
import { useLogin } from "../../hooks";

const Login = () => {
  const { handleSubmit, handleChange, user } = useLogin();

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

export default Login;
