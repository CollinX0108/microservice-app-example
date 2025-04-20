const express = require('express');
const router = express.Router();
const createCircuitBreaker = require('../middleware/circuitBreaker');

// GET /todos
router.get('/', async (req, res) => {
    const breaker = createCircuitBreaker(async () => {
        // Lógica existente para obtener TODOs
        return await getTodosFromDatabase();
    });

    try {
        const todos = await breaker.fire();
        res.json(todos);
    } catch (error) {
        res.status(503).json({ 
            error: 'Servicio temporalmente no disponible',
            details: error.message 
        });
    }
});

// POST /todos
router.post('/', async (req, res) => {
    const breaker = createCircuitBreaker(async () => {
        // Lógica existente para crear TODO
        return await createTodoInDatabase(req.body);
    });

    try {
        const newTodo = await breaker.fire();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(503).json({ 
            error: 'Servicio temporalmente no disponible',
            details: error.message 
        });
    }
});

module.exports = router; 