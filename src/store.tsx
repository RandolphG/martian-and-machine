import React, { createContext, useEffect, useReducer } from "react";
import { getPosts } from "./api";

const initialState: any = {
  posts: [],
  message: `Hello from`,
  loginInfo: {
    name: "",
    email: "",
    password: "",
  },
};

export const Store = createContext(initialState);

export enum Enum {
  updatePosts = "UPDATE_POSTS",
  updateComponent = "UPDATE_COMPONENT_NAME",
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case Enum.updatePosts:
      return {
        ...state,
        posts: action.payload,
      };
    case Enum.updateComponent:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      getPosts()
        .then((data: any) => {
          console.log("%c data fetched: \n", "color:green;", data);
          return data;
        })
        .then((data) =>
          dispatch({
            type: Enum.updatePosts,
            payload: data,
          })
        );
    } catch (error) {
      console.log(`Error : `, error);
    }
  }, []);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
