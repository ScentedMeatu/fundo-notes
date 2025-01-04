import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoutes from './note.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes', new noteRoutes().getRoutes());

  return router;
};

export default routes;
