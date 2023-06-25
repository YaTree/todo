import notificationService from './service'

const port = process.env.PORT || '30001';


notificationService.init().then(() => notificationService.start(parseInt(port)));
