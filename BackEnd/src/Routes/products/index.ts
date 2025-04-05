import {Router} from "express";
import listProducts from "./controllers/listProducts";
import getProductByID from "./controllers/getProductByID";
import updateProduct from "./controllers/updateProduct";
import deleteProduct from "./controllers/deleteProduct";
import createProduct from "./controllers/createProduct";
import {createProductSchema, updateProductSchema} from "../../db/productSchema";
import validateSchemas from "../../middleware/validateSchemas";
import { verifiedSeller } from "../../middleware/validateAuth";



const router = Router();


router.get("/", listProducts);
router.get('/:id', getProductByID);
router.post("/",verifiedSeller, validateSchemas(createProductSchema), createProduct);
router.put("/:id",verifiedSeller, validateSchemas(updateProductSchema), updateProduct);
router.delete("/:id",verifiedSeller, deleteProduct);


export default router;
