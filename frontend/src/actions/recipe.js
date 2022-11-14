/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/

export const FETCH_RECIPE = "FETCH_RECIPE"
export const FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS"
export const FETCH_RECIPE_FAILURE = "FETCH_RECIPE_FAILURE"

const fetchingRecipe = () => ({
  type: FETCH_RECIPE,
})

const fetchRecipeSuccess = (payload) => ({
  type: FETCH_RECIPE_SUCCESS,
  payload,
})

const fetchRecipeFailure = (payload) => ({
  type: FETCH_RECIPE_FAILURE,
  payload,
})

export const executeSearch = async (id) => {
  const response = await fetch(
    "https://sung-take-home-assignment-api.herokuapp.com/api/recipe/" + id
  )
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

export const fetchRecipe = (id) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeSearch(id)
      .then((res) => dispatch(fetchRecipeSuccess(res)))
      .catch((err) => dispatch(fetchRecipeFailure({ message: err.message })))
  }
}
