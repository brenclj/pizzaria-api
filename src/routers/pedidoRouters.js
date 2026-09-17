// src/routes/clienteRoutes.js
import express from 'express';

import * as pedidoController from '../controllers/pedidoController.js';

import validate from '../middlewares/validate.js'

import { pedidoCreateSchema, pedidoUpdateSchema } from '../controllers/pedidoController.js'

// 1. Importa o middleware de login. Descomentar para carregar
//import authMiddleware from '../middlewares/authmiddleWare.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(pedidoCreateSchema), pedidoController.criarPedido);// Rota final: POST /api/clientes

//router.use(authMiddleware);

router.get('/', pedidoController.listarPedidos);

router.put('/:cpf', validate(pedidoUpdateSchema), pedidoController.atualizarPedido);

router.delete('/:cpf', pedidoController.deletarPedido);

export default router;