import bcryptjs from 'bcryptjs'
import pool from '../database'

export const encriptar =  async (password:string):Promise<string> =>{
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password,salt);
}

export const validarPasswrod = async function(usuario:string,password:string):Promise<boolean>{
    const user = await pool.query('SELECT * FROM Usuario where email like ( ? )',[usuario]);
    return bcryptjs.compare(password,user[0].contrasena);
}

export const dataDuplicate = async function(email:string):Promise<boolean>{
    const user = await pool.query('SELECT * FROM Usuario where email like ( ? )',[email]);
    console.log(user);
    console.log(user.length)
    if(user.length == 0){
        return false
    }
    return true;
}