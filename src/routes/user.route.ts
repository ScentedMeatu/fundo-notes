import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import userAuthorization from '../middlewares/auth.middleware';

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

    //route for refresh token
    this.router.post('/refreshtoken',this.UserController.refreshtoken);

    //route for forgot password 
    this.router.post('/forgotpassword',this.UserController.forgotPass);

    //route for reset password
    this.router.post('/resetpassword',userAuthorization,this.UserController.resetPass);
  }

  public getRoutes = (): IRouter => {
    return this.router;
  }
}

export default UserRoutes;
