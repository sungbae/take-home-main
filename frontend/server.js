const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

const staticDir = path.resolve(__dirname, "static")
const buildTemplate = path.resolve(staticDir, "index-template.html")

app.use(express.static(staticDir))

app.get("/", function (request, response) {
  response.sendFile(buildTemplate)
})

app.listen(PORT, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      )
)
