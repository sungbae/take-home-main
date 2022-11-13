// TODO Create a connected component to render a fetched recipe
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import Modal from "../Modal"
import { BlueButton, ErrorMessage } from "./styles"

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

    this.props.openModal({
      modalType: "RecipeModal",
      modalProps: {},
    })
  }

  getRecipeModal() {
    return (
      <Modal title={this.props.recipe.name}>
        <>
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
      </Modal>
    )
  }

  getErrorModal() {
    return (
      <Modal title={"Error"}>
        <ErrorMessage>{this.props.error.message}</ErrorMessage>
      </Modal>
    )
  }

  // TODO: think about moving title to modal props
  // How should I display errors?

  render() {
    return (
      <>
        {this.props.selectedRecipeId ? (
          <>
            <BlueButton onClick={this.handleClick}>fetch recipe</BlueButton>
            <Divider />
          </>
        ) : null}
        {this.props.recipe
          ? this.getRecipeModal()
          : this.props.error
          ? this.getErrorModal()
          : null}
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
    Object.assign(
      {},
      {
        fetchRecipe: actions.fetchRecipe,
      },
      {
        openModal: actions.openModal,
      }
    ),
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
