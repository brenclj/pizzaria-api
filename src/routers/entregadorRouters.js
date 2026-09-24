// src/routes/clienteRoutes.js
import express from 'express';

import * as entregadorController from '../controllers/entregadorController.js';

import validate from '../middlewares/validate.js'

import { entregadorCreateSchema, entregadorUpdateSchema } from '../controllers/entregadorController.js'

// 1. Importa o middleware de login. Descomentar para carregar
//import authMiddleware from '../middlewares/authmiddleWare.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(entregadorCreateSchema), entregadorController.adicionarEntregador);// Rota final: POST /api/clientes

//router.use(authMiddleware);

router.get('/', entregadorController.listarEntregadores);

router.put('/:idEntregador', validate(entregadorUpdateSchema), entregadorController.atualizarEntregador);

router.delete('/:idEntregador', entregadorController.deletarEntregador);

export default router;