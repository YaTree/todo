import exsModule = require('express');
import corsModule = require('cors');
import {AppDataSource} from '../core/data.source';
import * as path from 'path';
import {notificationRouter} from './routes/notification.router';
import {todoService} from '../todo.service/services/impl/todo.service.impl';

const logger = require('morgan');
const bodyParser = require('body-parser');

class NotificationService {
    public express: exsModule.Application;

    constructor() {
        this.express = exsModule();
        this.configuration();
        this.mountRoutes();
    }

    public async init(): Promise<void> {
        await this.initDb();
    }


    private mountRoutes(): void {
        this.express.use('/', notificationRouter);

        const router = exsModule.Router();
        router.get('/', (req, res) => {
            res.json({
                message: ''
            })
        });

        router.get('/board', async (req, res) => {
            const resp = await fetch(`http://localhost:${process.env.PORT || 30001}/notifications`)
            const responseBody = await resp.json()

            res.render('board', {notifications: responseBody.data})
        })

        this.express.use('/', router)
    }

    private async initDb(): Promise<any> {
        await AppDataSource.initialize()
            .catch((error) => console.log(error))
    }

    private configuration(): void {
        this.express.use('/css', exsModule.static(__dirname + '/views/resources/css'))
        this.express.use('/js', exsModule.static(__dirname + '/views/resources/js'))

        this.express.set('view engine', 'ejs')
        this.express.set('views', path.join(__dirname, '/views'));
        this.express.use(corsModule());
        // this.express.use(userAgent.express());
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


export default new NotificationService();
