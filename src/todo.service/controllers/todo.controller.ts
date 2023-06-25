import {todoService} from '../services/impl/todo.service.impl';
import {Request, Response} from 'express';
import {Mapper} from '../../core/impl/core.mapper.impl';
import {ToDoControllerDTO} from './dto/todo.controller.dto';
import {ToDoDTO} from '../services/dto/todo.dto';


export function getTodos(req: Request, res: Response, next: any) {
    todoService.getAll().then(data => {
        res.status(200)
            .json({
                data: Mapper.convertList<ToDoControllerDTO>(data, ToDoControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function getToDo(req: Request, res: Response, next: any) {
    todoService.getById(req.params['id']).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<ToDoControllerDTO>(data, ToDoControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function updateToDo(req: Request, res: Response, next: any) {

    todoService.update(Mapper.convert(req.body, ToDoDTO)).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<ToDoControllerDTO>(data, ToDoControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function createToDo(req: Request, res: Response, next: any) {
    todoService.create(Mapper.convert(req.body, ToDoDTO)).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<ToDoControllerDTO>(data, ToDoControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function deleteToDo(req: Request, res: Response, next: any) {
    todoService.delete(req.params['id']).then(data => {
        res.status(204)
            .json();
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}
