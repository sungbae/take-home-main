import bodyParser from "body-parser"
import express from "express"
import http from "http"
import { createAndConnectToServer } from "./db"
import { recipeMiddleware, searchMiddleware } from "./routes"

const PORT = process.env.PORT || 4000

const appStartup = async (): Promise<void> => {
  console.log("i made it to the first line in appstartup")
  await createAndConnectToServer()
  console.log("line 12")
  const app = express()
  console.log("line 14")
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  console.log("line 18")
  // create our routes
  app.get("/api/recipe/:id", recipeMiddleware)
  app.post("/api/search", searchMiddleware)
  // create a server
  const httpServer = new http.Server(app)
  httpServer.listen(+PORT, "0.0.0.0", () => {
    console.log("now running on " + PORT)
  })
}

appStartup()
