// TODO Create a connected component to render a fetched recipe
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import Modal from "../Modal"
import { ErrorMessage } from "./styles"

function Recipe(props) {
  const { selectedRecipeId, recipe, error } = props

  useEffect(() => {
    if (selectedRecipeId) {
      props.fetchRecipe(selectedRecipeId)
    }
  }, [selectedRecipeId])

  function openRecipeModal() {
    props.openModal({
      modalType: "RecipeModal",
      modalProps: {
        title: recipe.name,
        body: (
          <List>
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient._id}>
                <ListItemText
                  primary={`${ingredient.name} ${ingredient.amount} ${ingredient.unit}`}
                />
              </ListItem>
            ))}
          </List>
        ),
      },
    })
  }

  function openErrorModal() {
    props.openModal({
      modalType: "ErrorModal",
      modalProps: {
        title: "Error",
        body: <ErrorMessage>{error.message}</ErrorMessage>,
      },
    })
  }

  if (error) {
    openErrorModal()
  } else if (selectedRecipeId && recipe) {
    openRecipeModal()
  } else {
    return null
  }

  return <Modal />
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return { selectedRecipeId: search.selectedRecipeId, ...recipe }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRecipe: actions.fetchRecipe,
      openModal: actions.openModal,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
