import 'dotenv/config';


//sintaxe de importação para todas as dependencias
import express from 'express';
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

// importando as rotas de autenticação

// import authRouters from './routers/authRouters.js';

import clienteRouters from '../src/routers/clienteRouters.js'

import produtoRouters from './routers/produtoRouters.js';

import pedidoRouters from  '../src/routers/pedidoRouters.js';

import entregadorRouters from '../src/routers/entregadorRouters.js';

// import { METHODS } from "http";

//configurações

const __filename = fileURLToPath (import.meta.url);

const __dirname = path.dirname(__filename);

const corsOptions = {
    origin : ['http://localhost:3333' , 'http://meudominio.com'],
    METHODS: 'GET,POST,PUT,PATCH,DELETE',
    Credentials: true,
};

//---Inicialização do app---

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Servindo pasta public para arquivos css , js


app.use(express.static(path.join(__dirname, '..','public')));

// ---rotas--

app.get('/',(req ,res) => {
    res.sendFile(path.join(__dirname, '..', 'pages',
        'home.html'
    ));
});
// Rotas da api
const apiPrefix = '/api';

app.use(`${apiPrefix}/clientes`, clienteRouters);

// app.use(`${apiPrefix}/login`, authRouters);

app.use(`${apiPrefix}/produtos`, produtoRouters);

app.use(`${apiPrefix}/pedidos`, pedidoRouters);

app.use(`${apiPrefix}/entregador`, entregadorRouters);

app.use((err,req,res,next) => {console.error(err.stack);
    res.status(500).send('Algo deu errado no Servidor!');
});

const PORTA = process.env.PORT;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});






 




