/*
  TODO: Create reducer and state updates here for recipe
*/

import {
  FETCH_RECIPE,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPE_SUCCESS,
} from "../actions"

const initialState = {
  name: null,
  isLoading: false,
  error: null,
}

const fetchingRecipe = (state) => {
  return { ...state, isLoading: true }
}

const fetchRecipeSuccess = (state, payload) => {
  return { ...state, isLoading: false, recipe: payload }
}

const fetchRecipeFailure = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RECIPE:
      return fetchingRecipe()
    case FETCH_RECIPE_SUCCESS:
      return fetchRecipeSuccess(state, payload)
    case FETCH_RECIPE_FAILURE:
      return fetchRecipeFailure(state, payload)
    default:
      return state
  }
}
