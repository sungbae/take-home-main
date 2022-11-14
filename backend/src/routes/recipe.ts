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
  const foundRecipe = await RecipeModel.findById(req.params.id)
  if (!foundRecipe) {
    res.sendStatus(404)
    return
  }
  const builtRecipe = buildRecipeRes(foundRecipe)
  res.send(builtRecipe)
}
