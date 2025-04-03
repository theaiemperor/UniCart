import express from "express";
import products from "./Routes/products";


const app = express()
const port = process.env.PORT || 3000;


// middlewares
app.use(express.json());


// Routes
app.get('/', (_, res) => {
    res.send('Hello from UniCart!')
})

app.use('/api/v1/products', products);


app.listen(port, () => {
    console.log(`UniCart is listening on port ${port}`)
})


