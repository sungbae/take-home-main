import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { builtRecipes } from "./data"
import { RecipeModel } from "./models"

const createRecipes = async (): Promise<void> => {
  try {
    await RecipeModel.insertMany(builtRecipes)
  } catch (err) {
    console.log("Creation Issue: ", err)
  }
}

export const createAndConnectToServer = async (): Promise<typeof mongoose> => {
  const mongod = new MongoMemoryServer({
    autoStart: false,
  })
  console.log("db line 18")
  await mongod.start()
  console.log("db line 20")
  const url = await mongod.getConnectionString()
  console.log("db line 22")
  const connection = await mongoose.connect(url, {
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 30000,
  })
  console.log("db line 28")
  // add default recipes
  await createRecipes()
  return connection
}
