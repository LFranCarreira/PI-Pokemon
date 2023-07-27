import axios from "axios";

import { GET_POKEMONS } from "./types";

export const getPokemons = () => {
  return async (dispatch) => {
      try {
          const URL = 'http://localhost:3001/pokemons';
          const pk = await axios.get(URL);
          return dispatch({
              type: GET_POKEMONS,
              payload: pk.data
          });
      } catch (e) {
          console.log(e);
      };     
  };
};

