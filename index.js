import { pizzas } from "./cardapiopizza.js";
import 'dotenv/config';
import express from 'express';

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: "Bem vindo à API da Pizzaria Senac!" });
});

const PORTA = process.env.PORT
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
});

app.get('/pizzas', (req, res) => {
    res.json(pizzas);
})

app.get('/pizzas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = pizzas.find(p => p.id === id);

    if (!pizza) {
        return res.status(404).json({ error: 'Pizza não encontrada' });
    }

    res.json(pizza);
});
