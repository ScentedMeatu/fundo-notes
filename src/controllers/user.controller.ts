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
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
