import {Router} from "express";
import validateSchemas from "../../middleware/validateSchemas";
import listOrders from "./controllers/listOrders";
import createOrder from "./controllers/createOrder";
import getOrderById from "./controllers/getOrderById";
import {createOrderItemsSchema} from "../../db/orderSchema";
import deleteOrder from "./controllers/deleteOrder";
import cancelOrder from "./controllers/cancelOrder";


const router = Router();

router.get('/', listOrders);
router.get('/:id', getOrderById);
router.post('/', validateSchemas(createOrderItemsSchema), createOrder);
router.delete('/:id', deleteOrder);
router.patch("/:id", cancelOrder);

export default router;
