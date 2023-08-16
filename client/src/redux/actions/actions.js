import axios from "axios";

import { GET_POKEMONS } from "./types";
//getPokemons, it gets the pokemons created in the db and the first 100 from the api that are found in the ulr
export const getPokemons = () => {
  return async (dispatch) => {
      try {
          const URL = 'http://localhost:3001/pokemons';
          const pk = await axios.get(URL);
          return dispatch({
              type: GET_POKEMONS,
              payload: pk.data
          });
      } catch (error) {
          console.log(error);
      };     
  };
};