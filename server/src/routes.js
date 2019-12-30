import { Router } from 'express';

import AuthMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import MyHelpOrderController from './app/controllers/MyHelpOrderController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', MyHelpOrderController.store);
routes.get('/students/:id/help-orders', MyHelpOrderController.index);
routes.get('/students/help-orders/:id', MyHelpOrderController.show);

routes.use(AuthMiddleware);
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);
routes.get('/students/:id', StudentController.show);
routes.delete('/students/:id', StudentController.destroy);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.get('/registrations/:id', RegistrationController.show);
routes.delete('/registrations/:id', RegistrationController.destroy);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.show);
routes.delete('/help-orders/:id', HelpOrderController.destroy);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

export default routes;
