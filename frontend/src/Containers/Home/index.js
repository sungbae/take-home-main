import Checkbox from "@material-ui/core/Checkbox"
import Divider from "@material-ui/core/Divider"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Input from "@material-ui/core/Input"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import React, { useState } from "react"
import { connect } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import { BlueButton } from "../Recipe/styles"
import { ErrorMessage, HomeWrapper, ListItem } from "./styles"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

function Home(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const termParam = searchParams.get("term")
  const ingredientsParam = searchParams.get("ingredients")

  const [term, setTerm] = useState(termParam || "")
  const [ingredients, setIngredients] = useState(
    ingredientsParam ? ingredientsParam.split(",") : []
  )
  const [selectedRecipeId, setSelectedRecipeId] = useState("")

  function fetchSearch() {
    // TODO: something is missing here for fetching
    props.searchRecipes(term, ingredients)
    const params = []
    if (term) {
      params.push(`term=${term}`)
    }
    if (ingredients.length > 0) {
      params.push(`ingredients=${ingredients.join(",")}`)
    }
    setSearchParams(params.join("&"))
  }

  function handleSearch(event) {
    setTerm(event.target.value)
  }

  function handleIngredient(ingredient, event) {
    const targetIngredients = [...ingredients]
    if (event.target.checked) {
      targetIngredients.push(ingredient)
    } else {
      const foundIngredient = targetIngredients.indexOf(ingredient)
      targetIngredients.splice(foundIngredient, 1)
    }
    setIngredients(targetIngredients)
  }

  function handleRecipeClick(recipeId) {
    props.selectRecipe(recipeId)
    setSelectedRecipeId(recipeId)
  }

  const { recipes, isLoading, error } = props
  return (
    <HomeWrapper>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={handleSearch}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={(e) => handleIngredient(ingredient, e)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <BlueButton onClick={fetchSearch}>search</BlueButton>
      <Divider />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <Divider />
      {recipes?.length > 0 && (
        <List>
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              selected={recipe.id == selectedRecipeId}
            >
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && <LinearProgress />}
      <Divider />
      {
        /*
          TODO: Add a recipe component here.
          I'm expecting you to have it return null or a component based on the redux state, not passing any props from here
          I want to see how you wire up a component with connect and build actions.
          */
        <Recipe />
      }
    </HomeWrapper>
  )
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      selectRecipe: actions.selectRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
