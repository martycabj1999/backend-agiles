//Dependencias
import dotenv from 'dotenv';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import {
    logger
} from './src/modules/logger/logger';
import {
    PORT_BACKEND
} from './config';

const bodyParser = require('body-parser');
const app = express();
let server = http.createServer(app);
dotenv.config();

//Routes
import authRoutes from './src/modules/auth/routes';
import petRoutes from './src/modules/pet/routes';

//Middlewares
import {
    jwtAuth,
    handleAuthError
} from './src/modules/auth/middleware/auth';
import rbacMiddleware from './src/modules/auth/middleware/rbacMiddleware';
import corsMiddleware from './src/modules/middleware/corsMiddleware';

const port = PORT_BACKEND;

//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerAuth from './swagger/auth.json';

app.use('/api-auth', swaggerUi.serve, swaggerUi.setup(swaggerAuth));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//CORS Middleware
app.use(corsMiddleware);

//Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//AUTH Middleware
app.use(jwtAuth);
app.use(handleAuthError);

//RBAC Middleware
app.use(rbacMiddleware);

//Routes
app.use('/', authRoutes);
app.use('/', petRoutes);

//It allows consuming the images saved in the Backend
app.use('/assets', express.static('assets'));
app.use('/upload', express.static('upload'));

app.get('/hello', (req, res) => {
    res.send("Hello")
});

server.listen(port, () => logger.info('Listening port: ' + port));