import {Router} from "express"
import userController from "../controladores/user.controlador.js"
import userValidation from "../middleware/validateToken.js";

const usersRoutes = Router();

usersRoutes.get('/', userValidation, userController.getAll)
usersRoutes.post('/new', userController.createOne)
usersRoutes.post('/login',userController.login )

export default usersRoutes