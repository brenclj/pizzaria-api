// src/controllers/clientecontroller.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const pedidoCreateSchema = Joi.object({
    idPedido: Joi.string().required(),
    formaPagto: Joi.string().max(10).required(),
    valorTotal:Joi.number().required(),
    idEntregador:Joi.number().required(),
    cpf: Joi.string().length(11).required(),
    statusPedido: Joi.string().required().max(20),
    formaEntrega: Joi.string().required().max(15),
});

export const pedidoUpdateSchema = Joi.object({
    idPedido: Joi.string(),
    formaPagto: Joi.string(),
    valorTotal: Joi.number(),
    idEntregador:Joi.number(),
    statusPedido:Joi.string(),
    formaEntrega:Joi.string(),
}).min(1);

export const listarPedidos = async (req, res) => {
    try {
        const { idPedido, cpf, statusPedido } = req.query;
        //Passamos todos os filtros para o serviço
        const pedido = await pedidoService.findAll(idPedido, cpf, statusPedido);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(pedido);
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const criarPedido = async (req, res) => {
    try {
        const novoPedido = await pedidoService.create(req, body);
        res.status(201).json({ message: 'Pedido criado com sucesso', data: novoPedido });
    } catch (err) {
        console.error('Erro ao criar pedido:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'CPF já cadastrado.' });
        }
        res.status(500).json({ error: 'Erro ao adicionar cliente' })
    }
};

export const atualizarPedido = async (req, res) => {
    try {
        const { idPedido, statusPedido } = req.params;
        const updated = await pedidoService.update(cpf, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Pedido não encontrado'});
        }
        res.status(200).json({ message: 'Pedido atualizado com sucesso'});
    } catch (err) {
        console.error('Erro ao atualizar pedido');
        res.status(500).json({ error: 'Erro ao atualizar pedido'});
    }
};

export const deletarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const deleted = await pedidoService.remove(idPedido);
        if (!deleted) {
            return res.status(404).json({ error: 'Pedido não encontrado'});
        }
        res.status(200).json({ message: 'Pedido deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar pedido', err);
        res.status(500).json({ error: 'Erro ao deletar pedido'});
    }
};