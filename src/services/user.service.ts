import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';

import user from '../models/user';

class UserService {

  private user = user(sequelize, DataTypes);

  //register user 
  public registerUser = async (userData: { username: string; email: string; password: string }): Promise<any> => {
    const exist = await this.user.findOne({ where: { email: userData.email } });
    if (exist) {
      throw Error('user already exist');
    }
    const user = await this.user.create(userData);
    return user;
  };

  //login user
  public loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
    const user = await this.user.findOne({ where: { email: credentials.email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    if (credentials.password === user.dataValues.password) {
      return { message: 'logged in successfully!', user };
    } else {
      throw new Error('Invalid email or password');
    }
  };
}

export default UserService;
