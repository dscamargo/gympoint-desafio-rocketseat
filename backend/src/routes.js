import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import AuthMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import MyHelpOrderController from './app/controllers/MyHelpOrderController';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validationRegistrationStore from './app/validators/RegistrationStore';
import validationRegistrationUpdate from './app/validators/RegistrationUpdate';
import validationSessionStore from './app/validators/SessionStore';
import validationHelpOrderStore from './app/validators/HelpOrderStore';
import validationHelpOrderUpdate from './app/validators/HelpOrderUpdate';

const routes = new Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post(
  '/sessions',
  validationSessionStore,
  bruteForce.prevent,
  SessionController.store
);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post(
  '/students/:id/help-orders',
  validationHelpOrderStore,
  MyHelpOrderController.store
);
routes.get('/students/:id/help-orders', MyHelpOrderController.index);
routes.get('/students/help-orders/:id', MyHelpOrderController.show);

// routes.get('/debug-sentry', function mainHandler(req, res) {
//   throw new Error('My first Sentry error!');
// });

routes.use(AuthMiddleware);
routes.post('/students', validateStudentStore, StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);
routes.get('/students/:id', StudentController.show);
routes.delete('/students/:id', StudentController.destroy);

routes.post('/plans', validatePlanStore, PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.post(
  '/registrations',
  validationRegistrationStore,
  RegistrationController.store
);
routes.put(
  '/registrations/:id',
  validationRegistrationUpdate,
  RegistrationController.update
);
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.delete('/registrations/:id', RegistrationController.destroy);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.show);
routes.delete('/help-orders/:id', HelpOrderController.destroy);
routes.put(
  '/help-orders/:id/answer',
  validationHelpOrderUpdate,
  HelpOrderController.update
);

export default routes;
