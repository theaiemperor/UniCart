import {Router} from "express";
import register from "./controllers/register";
import login from "./controllers/login";
import validateSchemas from "../../middleware/validateSchemas";
import {loginSchema, registerSchema} from "../../db/userSchema";


const router = Router();


router.post('/register', validateSchemas(registerSchema), register);
router.post('/login', validateSchemas(loginSchema), login);


export default router;
