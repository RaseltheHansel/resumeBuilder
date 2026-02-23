import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authRequest } from '../types';

//define what a jwt patload looks like
interface JwtPayload {
  id: string;
}

const verifyToken = (req: authRequest, res: Response, next: NextFunction): void => {

  //get token from authorization header 
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token. Please login.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not defined');

    //verify token and cast to our jwtpayload interface
    const decoded = jwt.verify(token, secret) as JwtPayload;

    //attach userId to request object for use in controllers
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;