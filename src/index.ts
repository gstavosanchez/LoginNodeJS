//import app from './app'

/*async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port',app.get('port'));
}
main(); */

import express,{Application} from 'express';
import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

class Server {
    public app:Application;

    constructor(){
        dotenv.config();
        //console.log(process.env.TESTING);
        this.app = express();
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port',process.env.PORT || 4000)
        this.app.use(morgan('dev'));
        this.app.use(cors()); //Sirve para que angular pueda pedir datos al servidor
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))

    }
    routes() : void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/user',userRoutes);
        this.app.use('/api/auth',authRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),() =>{
            console.log(`Server on port`,this.app.get('port'))
        });
    }
}
const server = new Server();
server.start();