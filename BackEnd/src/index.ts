import express from "express";

const app = express()
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Hello from UniCart!')
})

app.listen(port, () => {
  console.log(`UniCart is listening on port ${port}`)
})
