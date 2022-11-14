import Checkbox from "@material-ui/core/Checkbox"
import Divider from "@material-ui/core/Divider"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Input from "@material-ui/core/Input"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import MuiListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { withStyles } from "@material-ui/core/styles"
import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import { BlueButton } from "../Recipe/styles"
import { HomeWrapper } from "./styles"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.handleRecipeClick = this.handleRecipeClick.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.state = {
      term: localStorage.getItem("term"),
      ingredients: ["milk"],
    }
  }
  fetchSearch() {
    // TODO: something is missing here for fetching
    this.props.searchRecipes(this.state.term)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term }, () => localStorage.setItem("term", this.state.term))
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  handleRecipeClick(recipeId) {
    this.props.selectRecipe(recipeId)
    this.setState({ selectedRecipeId: recipeId })
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading, selectedRecipeId } = this.props
    const ListItem = withStyles({
      root: {
        "&$selected": {
          backgroundColor: "steelblue",
          color: "white",
          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },
        "&$selected:hover": {
          backgroundColor: "steelblue",
          color: "white",
          "& .MuiListItemIcon-root": {
            color: "white",
          },
          cursor: "pointer",
        },
        "&:hover": {
          backgroundColor: "lightgray",
          color: "white",
          "& .MuiListItemIcon-root": {
            color: "white",
          },
          cursor: "pointer",
        },
      },
      selected: {},
    })(MuiListItem)
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
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
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <BlueButton onClick={this.fetchSearch}>search</BlueButton>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem
                key={recipe.id}
                onClick={() => this.handleRecipeClick(recipe.id)}
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
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    Object.assign(
      {},
      {
        searchRecipes: actions.searchRecipes,
      },
      {
        selectRecipe: actions.selectRecipe,
      }
    ),
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
