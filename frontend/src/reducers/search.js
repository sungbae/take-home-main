import {
  FAIL_SEARCH,
  GET_SEARCH,
  RECEIVE_SEARCH,
  SELECT_RECIPE,
} from "../actions"

const initialState = {
  recipes: null,
  isLoading: false,
  error: null,
}

const searchFetching = (state) => {
  return { ...state, isLoading: true }
}

const searchFetched = (state, payload) => {
  return { ...state, isLoading: false, recipes: payload }
}

const searchFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

const selectRecipe = (state, selectedRecipeId) => {
  return { ...state, selectedRecipeId }
}

export default (state = initialState, { type, payload, selectedRecipeId }) => {
  switch (type) {
    case GET_SEARCH:
      return searchFetching()
    case RECEIVE_SEARCH:
      return searchFetched(state, payload)
    case FAIL_SEARCH:
      return searchFailed(state, payload)
    case SELECT_RECIPE:
      return selectRecipe(state, selectedRecipeId)
    default:
      return state
  }
}
