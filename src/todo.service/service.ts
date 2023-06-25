import exsModule = require('express');
import corsModule = require('cors');
import {todoRouter} from './routes/todo.router';
import {AppDataSource} from '../core/data.source';
import * as path from 'path';
import {JobHandlers} from './services/scheduler/send-notifcation.handler.job';
import {todoService} from './services/impl/todo.service.impl';

const moment = require('moment-timezone');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Agenda = require('agenda');
export const agenda = new Agenda({db: {address: `mongodb://${process.env.DB_HOST}/agenda`}});

class ToDoService {
    public express: exsModule.Application;

    constructor() {
        this.express = exsModule();
        this.configuration();
        this.mountRoutes();
    }

    public async init(): Promise<void> {
        await this.initDb();
        await this.initAgenda();
    }


    private mountRoutes(): void {
        this.express.use('/', todoRouter);

        const router = exsModule.Router();
        router.get('/', (req, res) => {
            res.json({
                message: ''
            })
        });

        router.get('/board', async (req, res) => {
            const resp = await fetch(`http://localhost:${process.env.PORT || 30000}/todos`)
            const responseBody = await resp.json()

            res.render('board', {todos: responseBody.data})
        })

        this.express.use('/', router)
    }

    private async initDb(): Promise<void> {
        await AppDataSource.initialize()
            .then(async () => {
                const data = await todoService.getAll();

                if (data.length == 0) {
                    await todoService.create({
                        createdAt: null, id: null, updatedAt: null,
                        title: 'Test #1',
                        description: 'This you will see in 47 seconds after you started the todo.service',
                        deadlineAt: 'in 47 seconds'
                    });
                    await todoService.create({
                        createdAt: null, id: null, updatedAt: null,
                        title: 'Test #2',
                        description: 'This in 5 minutes',
                        deadlineAt: 'in 5 minutes'
                    });
                    await todoService.create({
                        createdAt: null, id: null, updatedAt: null,
                        title: 'Make and send a review #1',
                        description: 'Don\'t forget to send me your feedback #1',
                        deadlineAt: 'in 1 day'
                    });
                    await todoService.create({
                        createdAt: null, id: null, updatedAt: null,
                        title: 'Make and send a review #2',
                        description: 'Don\'t forget to send me your feedback #2',
                        deadlineAt: 'in 3 days'
                    });
                    await todoService.create({
                        createdAt: null, id: null, updatedAt: null,
                        title: 'Make and send a review #3',
                        description: 'Don\'t forget to send me your feedback #3',
                        deadlineAt: 'in 7 days'
                    });
                }
            })
            .catch((error) => console.log(error))
    }

    private async initAgenda(): Promise<void> {
        agenda.define('send-notification', JobHandlers.sendScheduledNotification);

        await agenda.start();
    }

    private configuration(): void {
        this.express.use('/css', exsModule.static(__dirname + '/views/resources/css'))
        this.express.use('/js', exsModule.static(__dirname + '/views/resources/js'))
        this.express.set('view engine', 'ejs')
        this.express.set('views', path.join(__dirname, '/views'));
        this.express.use(corsModule());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({limit: '50mb'}));
        this.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    }

    start(port: number): void {
        this.express.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }

}


export default new ToDoService();
