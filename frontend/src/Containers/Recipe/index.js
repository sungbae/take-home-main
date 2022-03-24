// TODO Create a connected component to render a fetched recipe
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import { BlueButton } from "./styles"

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      fetchedRecipeId: "",
    }
  }

  handleClick() {
    this.setState({ fetchedRecipeId: this.props.selectedRecipeId })
    this.props.fetchRecipe(this.props.selectedRecipeId)
  }

  render() {
    console.log(this.state.fetchedRecipeId)
    return (
      <>
        {this.props.selectedRecipeId ? (
          <>
            <BlueButton onClick={this.handleClick}>fetch recipe</BlueButton>
            <Divider />
          </>
        ) : null}
        {this.props.selectedRecipeId === this.state.fetchedRecipeId &&
        this.props.recipe?.name ? (
          <>
            <h3>{this.props.recipe.name}</h3>
            <List>
              {this.props.recipe.ingredients.map((ingredient) => (
                <ListItem key={ingredient._id}>
                  <ListItemText
                    primary={`${ingredient.name} ${ingredient.amount} ${ingredient.unit}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return { selectedRecipeId: search.selectedRecipeId, ...recipe }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRecipe: actions.fetchRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
