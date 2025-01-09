import redisClient from "../config/redis";
import { Request, Response, NextFunction } from "express";

class redisCache {
    public getNote = async (req: Request, res: Response, next: NextFunction) => {
        const note = await redisClient.get(`Note?id=${req.params.id}&user=${req.body.createdBy}`);
        if (note) {
            res.status(200).json({data: JSON.parse(note), message: 'fetched from cache'});
        }
        next();
    }

    public getNotes = async (req: Request, res: Response, next: NextFunction) => {
        const notes = await redisClient.get(`Notes?user=${req.body.createdBy}`);
        if (notes) {
            res.status(200).json({data: JSON.parse(notes), message: 'fetched from cache'});
        }
        next();
    }
}

export default redisCache;