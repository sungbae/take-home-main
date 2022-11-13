import { combineReducers } from "redux"
import modal from "./modal"
import recipe from "./recipe"
import search from "./search"

export default combineReducers({ search, recipe, modal })
