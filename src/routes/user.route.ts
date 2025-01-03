import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    //route to register a new user
    this.router.post('/register',this.UserValidator.newUser, this.UserController.register);

    //route to login a user
    this.router.post('/login',this.UserController.login);
  }

  public getRoutes = (): IRouter => {
    return this.router;
  }
}

export default UserRoutes;
