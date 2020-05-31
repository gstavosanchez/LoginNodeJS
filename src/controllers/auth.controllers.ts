import { Response,Request } from 'express'
import pool from '../database'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {encriptar,validarPasswrod,dataDuplicate} from './encript.controllers'
import { idLogueado } from '../libs/verifyToken'
export interface IUser{
    nombre:string;
    apellido:string;
    email:string;
    contrasena:string;
}

class AuthController {


    public async signup(req:Request,res:Response):Promise<any>{
        ///Save Usuario
        //console.log(req.body);
        //this.hello(req.body.contrasena);
        const dicUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: await encriptar(req.body.contrasena)
        }
        const bandera:boolean = await dataDuplicate(req.body.email);
        if(bandera == true) {
            return res.status(400).json(`Duplicate Data: ${req.body.email}`);
        }
        
        await pool.query('INSERT INTO usuario set ?',[dicUser]);
        const users = await pool.query('SELECT * FROM Usuario where idUsuario = (select MAX(idUsuario) from usuario)');
            //Token
        const token:string = jwt.sign({_id:users[0].idUsuario},process.env.TOKEN_SECRET || 'tokentest')
            //res.header('auth-token',token).json(users[0]);
        return res.status(200).json({token})
        
        
    }
    public async signin(req:Request,res:Response){
        console.log(req.body);
        const user = await pool.query('SELECT * FROM Usuario where email like ( ? )',[req.body.email]);
        console.log(user[0])
        if (user[0] == null){
            return res.status(400).json('Email or password es incorrecto');
        }else{
            const correctPasswrod:boolean =await validarPasswrod(user[0].email,req.body.contrasena);
            if(!correctPasswrod) return res.status(400).json('password es incorrecta');
            
            const token:string = jwt.sign({_id:user[0].idUsuario},process.env.TOKEN_SECRET || 'tokentest',{
                expiresIn: 60 * 60 * 2
            })
            //res.header('auth-token',token).json(user[0]);
            return res.status(200).json({token})
        } 

        
    };
    public async profile(req:Request,res:Response):Promise<any>{
        //console.log(req.header('auth-token'));
        const id = idLogueado;
        const users = await pool.query('SELECT * FROM Usuario where idUsuario = ?',[id]);
        if(users.length > 0){
            //console.log(users[0].idUsuario);
            /*let userLoged = {
                idUsuario:users[0].idUsuario,
                nombre:users[0].nombre,
                apellido:users[0].apellido,
                email:users[0].email,
                contrasena:'',
                foto:users[0].foto,
                fecha_Creacion:users[0].fecha_Creacion
            } */
            //console.log(userLoged)

            return res.json(users[0]);
        }
        res.status(404).json({text:"El usuario no existe"})
    };


 
}
const authController = new AuthController();
export default authController;