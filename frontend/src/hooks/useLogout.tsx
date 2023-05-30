import { useAuthContext } from "./useAuthContext";
import { useMoviesContext } from "./useMoviesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {dispatch: moviesDispatch} = useMoviesContext();

  const logout = () => {
    // remove from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({type: 'LOGOUT'})
    moviesDispatch({type: 'SET_MOVIES', payload: null})
  };

  return {logout};
};
