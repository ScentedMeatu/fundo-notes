/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  /**
   * Controller to register a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.UserService.registerUser(req.body);
      res.status(HttpStatus.CREATED).json({
        message: `${user.username} registered successfully!`,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to login a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.UserService.loginUser(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        message: `${data.user.username} ${data.message}`,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to use refresh token
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public refreshtoken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.UserService.refreshToken(req.body);
      console.log(data);
      res.status(200).json({
        newToken: data
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller for forgot password
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public forgotPass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.UserService.forgotPassword(req.body);
      res.status(200).json({
        message: 'token sent to mail'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to reset user password
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public resetPass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.UserService.resetPassword(req.body);
      res.status(200).json({
        message: 'your password has been reset'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
