// src/routes/clienteRoutes.js
import express from 'express';

import * as clienteController from '../controllers/clienteController.js';

import validate from '../middlewares/validate.js'

import  {usuarioCreateSchema, usuarioUpdateSchema} from '../controllers/clienteController.js'

// 1. Importa o middleware de login. Descomentar para carregar
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(usuarioCreateSchema), clienteController.adicionarUsuario);// Rota final: POST /api/clientes

router.use(authMiddleware);

router.get('/', clienteController.listarUsuarios);

router.put('/:cpf', validate(usuarioUpdateSchema), clienteController.atualizarUsuario);

router.delete('/:cpf', clienteController.deletarUsuario);

export default router;