import { Request,Response } from 'express'

class IndexController{

    public index (req:Request,res:Response){
        res.json({text:"HOla mundo"})
    } 

}
export const indexController = new IndexController();