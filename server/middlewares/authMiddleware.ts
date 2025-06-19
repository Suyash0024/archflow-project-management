import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; 
import dotenv from 'dotenv';

dotenv.config();

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser; 
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined.');
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error: any) {
            console.error('Not authorized, token failed', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };