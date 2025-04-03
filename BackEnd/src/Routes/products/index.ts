import {Router} from "express";
import listProducts from "./controllers/listProducts";
import getProductByID from "./controllers/getProductByID";
import updateProduct from "./controllers/updateProduct";
import deleteProduct from "./controllers/deleteProduct";
import createProduct from "./controllers/createProduct";
import {createProductSchema, updateProductSchema} from "../../db/productSchema";
import validateSchemas from "../../middleware/validateSchemas";


const router = Router();


router.get("/", listProducts);
router.get('/:id', getProductByID);
router.post("/", validateSchemas(createProductSchema), createProduct);
router.put("/:id", validateSchemas(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);


export default router;
