import {createToDo, deleteToDo, getToDo, getTodos, updateToDo} from '../controllers/todo.controller';

const express = require('express');
const router = express.Router();

router.post('/todos', [], createToDo);
router.get('/todos', [], getTodos);
router.get('/todos/:id', [], getToDo);
router.delete('/todos/:id', [], deleteToDo);
router.put('/todos/:id', [], updateToDo);

export const todoRouter = router;
