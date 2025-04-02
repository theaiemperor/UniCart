import {Router} from "express";
import listProducts from "./controllers/listProducts";
import getProductByID from "./controllers/getProductByID";
import updateProduct from "./controllers/updateProduct";
import deleteProduct from "./controllers/deleteProduct";
import createProduct from "./controllers/createProduct";


const router = Router();


router.get("/", listProducts);
router.get('/:id',getProductByID);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id",deleteProduct);



export default router;
