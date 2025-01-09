const Redis = require('redis');
import Logger from './logger';

const logger = Logger.logger;
const redisClient = Redis.createClient();

redisConnect(redisClient);
async function redisConnect(redisClient){
    await redisClient.connect();
    logger.info('connected to redis');
}

export default redisClient;