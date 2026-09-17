// src/controllers/clientecontroller.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const produtoCreateSchema = Joi.object({
    idProduto: Joi.number().required(),
    nomeProduto: Joi.string().max(30).required(),
    descricao: Joi.string().max(100).required(),
    tipo: Joi.string().max(20).required(),
    valor: Joi.number().required(),
    imagem: Joi.string().max(200).required(),
});

export const produtoUpdateSchema = Joi.object({
    idProduto: Joi.number(),
    nomeProduto: Joi.string(),
    descricao: Joi.string(),
    tipo: Joi.string(),
    valor: Joi.number(),
    imagem: Joi.string(),
}).min(1);

export const listarProdutos = async (req, res) => {
    try {
        const { idProduto, nomeProduto } = req.query;
        //Passamos todos os filtros para o serviço
        const produto = await produtoService.findAll(idProduto, nomeProduto);
        //Lista vazia é uma resposta válida: 200 com []
        res.json(produto);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({ message: 'Produto criado com sucesso', data: novoProduto });
    } catch (err) {
        console.error('Erro ao criar produto:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Produto já cadastrado.' });
        }
        res.status(500).json({ error: 'Erro ao adicionar produto' })
    }
};

export const atualizarProduto = async (req, res) => {
    try {
        const { idProduto, nomeProduto } = req.params;
        const updated = await produtoService.update(idProduto, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Produto não encontrado'});
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso'});
    } catch (err) {
        console.error('Erro ao atualizar produto');
        res.status(500).json({ error: 'Erro ao atualizar produto'});
    }
};

export const deletarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const deleted = await produtoService.remove(idProduto);
        if (!deleted) {
            return res.status(404).json({ error: 'Produto não encontrado'});
        }
        res.status(200).json({ message: 'Produto deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar produto', err);
        res.status(500).json({ error: 'Erro ao deletar produto'});
    }
};