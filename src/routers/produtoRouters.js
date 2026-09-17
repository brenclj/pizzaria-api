// src/routes/clienteRoutes.js
import express from 'express';

import * as produtoController from '../controllers/produtoController.js';

import validate from '../middlewares/validate.js'

import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js'

// 1. Importa o middleware de login. Descomentar para carregar
//import authMiddleware from '../middlewares/authmiddleWare.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);// Rota final: POST /api/clientes

//router.use(authMiddleware);

router.get('/', produtoController.listarProdutos);

router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);

router.delete('/:idProduto', produtoController.deletarProduto);

export default router;