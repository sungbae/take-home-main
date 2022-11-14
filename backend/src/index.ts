import bodyParser from "body-parser"
import express from "express"
import http from "http"
import { createAndConnectToServer } from "./db"
import { recipeMiddleware, searchMiddleware } from "./routes"
const path = require("path")

const PORT = process.env.PORT || 4000

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer()
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(express.static(path.join(__dirname, "../../frontend/dist")))

  // create our routes
  app.get("/api/recipe/:id", recipeMiddleware)
  app.post("/api/search", searchMiddleware)
  // create a server

  app.get("*", function (request, response) {
    // response.sendFile(buildTemplate)
    response.sendFile(__dirname + "/../../frontend/dist/index-template.html")
  })

  const httpServer = new http.Server(app)
  httpServer.listen(+PORT, "0.0.0.0", () => {
    console.log("now running on " + PORT)
  })
}

appStartup()
