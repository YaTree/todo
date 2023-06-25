import todoService from './service'

const port = process.env.PORT || '30000';

todoService.init().then(() => todoService.start(parseInt(port)));
