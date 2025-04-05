import express from "express";
import products from "./Routes/products";
import auth from "./Routes/auth";
import orders from "./Routes/orders";
import {verifiedUser} from "./middleware/validateAuth";


const app = express()
const port = process.env.PORT || 3000;


// middlewares
app.use(express.json());


// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', verifiedUser, orders);

app.get('/', (_, res) => {
    res.send('Hello from UniCart!')
})


app.listen(port, () => {
    console.log(`UniCart is listening on port ${port}`)
})


