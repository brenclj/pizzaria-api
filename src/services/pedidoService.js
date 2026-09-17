import db from '../db/db.js';

export const findAll = async (idpedido, cpf) => {

    let sql = 'SELECT * from pedido';
    const conditions = [];
    const values = [];

    if (idpedido) {
        conditions.push('idpedido = ?')
        values.push(idpedido);
    }
    if (cpf) {
        conditions.push('cpf = ?');
        values.push(cpf);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (pedidoData) => {
    await db.query('INSERT INTO pedido SET ?', pedidoData);
    return pedidoData;
};
export const update = async (idPedido, pedidoData) => {
    const [result] = await db.query('UPDATE idPedido SET ? WHERE pedidoData = ?', [idPedido, pedidoData]);
    return result.affectedRows > 0;
};
export const remove = async (idPedido) => {
    const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
    return result.affectedRows > 0;
};

