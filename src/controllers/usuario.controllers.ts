import { Request,Response } from 'express'
import pool from '../database'
import { dataDuplicate,encriptar } from './encript.controllers'
class UserController{
    
    public async list (req:Request,res:Response):Promise<any>{
        const users = await pool.query('SELECT * FROM usuario');
        res.json(users);
    } 

    public async getOne (req:Request,res:Response): Promise<any>{
        const {id} = req.params;
        console.log(id);
        const users = await pool.query('SELECT * FROM Usuario where idUsuario = ?',[id]);
        if(users.length > 0){
            //console.log(users[0].idUsuario);
            //return res.json(users[0]);
            console.log(users[0])
            return res.json(users[0]);
        }
        res.status(404).json({text:"El usuario no existe"})

    } 
    
    public async create (req:Request,res:Response):Promise<any>{
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
        return res.status(200).json(`Save: ${ req.body.email}`);
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE Usuario set ? where idUsuario = ?',[req.body,id]);
        res.json({message:'update Usuario:' + req.params.id});
        console.log(req.body.contrasena)
    }
    public async delete (req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM Usuario where idUsuario = ?',[id])
        res.json({message:'Delete Usuario:' + req.params.id});
    }


}
const userController = new UserController();
export default userController;