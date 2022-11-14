import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import http from "http"
import { createAndConnectToServer } from "./db"
import { recipeMiddleware, searchMiddleware } from "./routes"

const PORT = process.env.PORT || 4000

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer()
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  // create our routes
  const corsOptions = {
    origin: "https://sung-take-home-assignment.herokuapp.com",
  }
  app.get("/api/recipe/:id", cors(corsOptions), recipeMiddleware)
  app.post("/api/search", cors(corsOptions), searchMiddleware)
  // create a server

  const httpServer = new http.Server(app)
  httpServer.listen(+PORT, "0.0.0.0", () => {
    console.log("now running on " + PORT)
  })
}

appStartup()
