import { createContext, useReducer, useEffect } from "react";
import { IUser } from "../interfaces/interfaces";

interface IContextProps {
  user: IUser;
  dispatch: ({ type }: { type: string; payload?: string }) => void;
}

export const AuthContext = createContext({} as IContextProps);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const valueString = localStorage.getItem("user");

    if (typeof valueString === "string") {
      const user = JSON.parse(valueString); // ok

      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
