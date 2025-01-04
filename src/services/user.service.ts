import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import {generateToken, verifyToken} from '../utils/token.util';
import user from '../models/user';

class UserService {

  private user = user(sequelize, DataTypes);

  //register user 
  public registerUser = async (userData: { username: string; email: string; password: string }): Promise<any> => {
    const exist = await this.user.findOne({ where: { email: userData.email } });
    if (exist) {
      throw Error('user already exist');
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create(userData);
    return user;
  };

  //login user
  public loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
    const user = await this.user.findOne({ where: { email: credentials.email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const match = await bcrypt.compare(credentials.password, user.dataValues.password);
    const accessToken = generateToken({userId: user.dataValues.id,email: user.dataValues.email},`${process.env.SECRET_TOKEN}`,{ expiresIn: '1d' });
    const refreshToken = generateToken({userId: user.dataValues.id,email: user.dataValues.email},`${process.env.REFRESH_SECRET_TOKEN}`,{ expiresIn: '30d' });
    this.user.update({refreshToken},{where:{id:user.dataValues.id}});
    if (match) {
      return { message: 'logged in successfully!', user, accessToken, refreshToken };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  public refreshToken = async (credentials: { refreshtoken: string }): Promise<any> => {
    if (!credentials.refreshtoken) {
      throw new Error('refreshtoken required');
    } 
      console.log(credentials.refreshtoken);
      
      const decoded = (await verifyToken(
        credentials.refreshtoken,
        `${process.env.REFRESH_SECRET_TOKEN}`
      )) as {userId,email};

      const verified = await this.user.findOne({where:{id:decoded.userId,email:decoded.email}});
      if(!verified){
        throw Error('token not found in database')
      }

      const newToken = await generateToken({userId: verified.dataValues.id,email: verified.dataValues.email},process.env.SECRET_TOKEN,{ expiresIn: '1d' });
      return newToken;
    }
  
}

export default UserService;
