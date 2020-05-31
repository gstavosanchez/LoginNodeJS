import express, { Router } from 'express';
import authController from '../controllers/auth.controllers'
import {TokenValidation} from '../libs/verifyToken'
class AuthRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }

    private config():void{
        this.router.post('/signup',authController.signup);
        this.router.post('/signin',authController.signin);
        this.router.get('/profile',TokenValidation,authController.profile);
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;