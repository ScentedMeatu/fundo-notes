/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { Model } from 'sequelize';
import { IUser } from '../interfaces/user.interface';

export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
    public username;
    public email;
    public password;
    public refreshToken;
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      refreshToken: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return User;
};
