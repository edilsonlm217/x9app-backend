import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';
import SearchController from './app/controllers/SearchController';
import InvoiceController from './app/controllers/InvoiceController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/clients', ClientController.store);
routes.get('/clients/all', ClientController.index);
routes.get('/clients', ClientController.show);

routes.get('/search', SearchController.index);

routes.post('/invoice', InvoiceController.store);
routes.delete('/invoice', InvoiceController.destroy);
routes.put('/invoice', InvoiceController.update);



export default routes;