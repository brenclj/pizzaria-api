// src/controllers/clientecontroller.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as entregadorServices from '../services/entregadorServices.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const entregadorCreateSchema = Joi.object({
    idEntregador: Joi.string().required(),
    nomeEntregador: Joi.string().required().max(100),
    telefone: Joi.string().required(),
});

export const entregadorUpdateSchema = Joi.object({
    idEntregador: Joi.string(),
    nomeEntregador: Joi.string().max(100),
    telefone: Joi.string(),
}).min(1);

export const listarEntregadores = async (req, res) => {
    try {
        const { idEntregador, nomeEntregador } = req.query;
        //Passamos todos os filtros para o serviço
        const entregador = await entregadorServices.findAll(idEntregador, nomeEntregador);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(entregador);
    } catch (err) {
        console.error('Erro ao buscar entregadores:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const adicionarEntregador = async (req, res) => {
    try {
        const novoEntregador = await entregadorServices.create(req.body);
        res.status(201).json({ message: 'Entregador cadastrado com sucesso', data: novoEntregador });
    } catch (err) {
        console.error('Erro ao cadastrar entregador:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Entregador já cadastrado.' });
        }
        res.status(500).json({ error: 'Erro ao cadastrar entregador' })
    }
};

export const atualizarEntregador = async (req, res) => {
    try {
        const { idEntregador, nomeEntregador } = req.params;
        const updated = await entregadorServices.update(idEntregador, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Entregador não encontrado'});
        }
        res.status(200).json({ message: 'Entregador atualizado com sucesso'});
    } catch (err) {
        console.error('Erro ao atualizar entregador');
        res.status(500).json({ error: 'Erro ao atualizar entregador'});
    }
};

export const deletarEntregador = async (req, res) => {
    try {
        const { idEntregador } = req.params;
        const deleted = await entregadorServices.remove(idEntregador);
        if (!deleted) {
            return res.status(404).json({ error: 'Entregador não encontrado'});
        }
        res.status(200).json({ message: 'Entregador deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar entregador', err);
        res.status(500).json({ error: 'Erro ao deletar entregador'});
    }
};