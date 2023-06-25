import {todoService} from '../impl/todo.service.impl';

export const JobHandlers = {
    sendScheduledNotification: async (job: any, done: any) => {
        const {data} = job.attrs;
        await todoService.sendNotification(data);
        done();
    },
};

