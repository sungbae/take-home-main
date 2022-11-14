export const GET_SEARCH = "GET_SEARCH"
export const RECEIVE_SEARCH = "RECEIVE_SEARCH"
export const FAIL_SEARCH = "FAIL_SEARCH"
export const SELECT_RECIPE = "SELECT_RECIPE"

const fetchingSearch = () => ({
  type: GET_SEARCH,
})

const fetchedSearch = (payload) => ({
  type: RECEIVE_SEARCH,
  payload,
})

const failedSearch = (payload) => ({
  type: FAIL_SEARCH,
  payload,
})

export const selectRecipe = (selectedRecipeId) => {
  return { type: SELECT_RECIPE, selectedRecipeId }
}

export const executeSearch = async (name, ingredients) => {
  const response = await fetch("-api/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, ingredients }),
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response.json()
}

// TODO: fix action
export const searchRecipes = (name, ingredients) => {
  return (dispatch) => {
    dispatch(fetchingSearch())
    return executeSearch(name, ingredients)
      .then((res) => dispatch(fetchedSearch(res)))
      .catch((err) => dispatch(failedSearch({ message: err.message })))
  }
}
