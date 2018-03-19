import Router from 'koa-router';
import index from './indexController';

const mainController = {

    init() {
        return new Router()
            .get('/', index.homeAction())
            .get('/model', index.modelAction());
    }
}

export default mainController;