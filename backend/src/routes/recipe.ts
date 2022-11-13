import { Request, Response } from "express"
import { RecipeModel } from "../models"

const buildRecipeRes = (recipe) => {
  const { name, instructions, ingredients } = recipe
  return { name, instructions, ingredients }
}

export const recipeMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO fetch and return a recipe
  try {
    const foundRecipe = await RecipeModel.findById(req.params.id)
    if (!foundRecipe) {
      res.sendStatus(404).send(`Could not find recipe with id ${req.params.id}`)
    }
    const builtRecipe = buildRecipeRes(foundRecipe)
    res.send(builtRecipe)
  } catch (e) {
    // log all details of error somewhere else
    // display user friendly message
    res
      .status(500)
      .send(
        `Server side failure. Unable to find recipe for id ${req.params.id}.`
      )
  }
}
