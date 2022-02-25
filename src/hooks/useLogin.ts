import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../context";

const componentName = "Login";

export const useLogin = () => {
  let navigate = useNavigate();
  const [user, setCredentials] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const { state } = useContext(Store);

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate("/app");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setCredentials({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    console.log(`${state.message} <${componentName} component>`);
  }, []);

  return {
    handleSubmit,
    handleChange,
    user,
    navigate,
  };
};
