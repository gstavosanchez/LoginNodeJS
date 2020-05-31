import express from 'express'
import morgan from 'morgan'
import indexRoutes from './routes/index.routes'
import path from 'path'
///ejecutar exprres

const app = express();



////Configuraciones
app.set('port',process.env.PORT || 4000);

///middlewars
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api',indexRoutes);

// this folder for this application will be used to store public files
app.use('/uploads',express.static(path.resolve('uploads')));

export default app;


///// Ya no se utilizo