import { Request, Response } from "express"
import { Ingredient, RecipeModel } from "../models"

const allIngredients = ["flour", "sugar", "salt", "butter", "milk"]

const escapeRegex = (text): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

interface Query {
  name?: RegExp
  ingredients?: Ingredient[]
}

const recipeCleaner = (recipe): { id: string; name: string } => {
  const { id, name } = recipe
  return { id, name }
}

export const searchMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, ingredients } = req.body
    const query: Query = {}
    if (name) {
      query.name = new RegExp(escapeRegex(name), "gi")
    }
    if (ingredients) {
      const whatsLeft = allIngredients.filter(
        (ing) => !ingredients.includes(ing)
      )
      query["ingredients.name"] = { $nin: whatsLeft }
    }

    const foundRecipes = await RecipeModel.find(query)
    const builtRecipes = foundRecipes.map(recipeCleaner)

    if (builtRecipes.length === 0) {
      res
        .status(404)
        .send(
          "No recipes found! Try a different search term and/or ingredients"
        )
    }
    res.send(builtRecipes)
  } catch (e) {
    // log all details of error somewhere else
    // display user friendly message
    res.status(500).send("Server side failure. Unable to search for recipes.")
  }
}
