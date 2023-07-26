import axios from "axios";

import { GET_POKEMONS } from "./types";

const getPokemons = () => {
  return async function (dispatch) {
     axios.get("/pokemons")
      .then((pk) => {
        return dispatch({
          type: GET_POKEMONS,
          payload: pk.data,
        });
      })
      .catch((error) => {
      const newError = [error]
      return dispatch({
          type: GET_POKEMONS,
          payload: newError,
        })
      });
  };
};

export { getPokemons };