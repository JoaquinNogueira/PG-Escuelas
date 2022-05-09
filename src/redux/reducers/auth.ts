import { Action, ActionTypes } from "../actions/types";
import { AuthStateInterface } from "../interfaces";
import jwtDecode from "jwt-decode";

const initialState: AuthStateInterface = {
  token: localStorage.getItem("token"),
  name: "",
  lastName: "",
  id: "",
  role: "",
  loginStatus: "",
  loginError: "",
  userLoded: false,
};

export const authReducer = (
  state: AuthStateInterface = initialState,
  action: Action
): AuthStateInterface => {
  switch (action.type) {
    case ActionTypes.signIn:
    case ActionTypes.loadUserAuth:
      const user: any = jwtDecode(action.payload);

      return {
        ...initialState,
        token: action.payload,
        name: user.name,
        lastName: user.lastName,
        id: user.cuil,
        role: user.role,
        loginStatus: "logged",
        loginError: "",
        userLoded: true,
      };

      

    default:
      return state;
  }
};
