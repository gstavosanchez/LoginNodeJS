import {Router} from 'express';
import usuarioController from '../controllers/usuario.controllers'
import userController from '../controllers/usuario.controllers';
import { TokenValidation } from '../libs/verifyToken'
class UserRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',TokenValidation,usuarioController.list);
        this.router.get('/:id',TokenValidation,usuarioController.getOne);
        this.router.post('/',TokenValidation,usuarioController.create);
        this.router.put('/:id',TokenValidation,usuarioController.update);
        this.router.delete('/:id',TokenValidation,usuarioController.delete);

        
        
    }
}
const userRoutes = new UserRoutes();
export default userRoutes.router;