import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, Secret } from 'jsonwebtoken';
import config from '../configs/configs';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-authorization'];
console.log(token)
  if (!token) {
    return res.status(403).json({ message: 'No authorization token provided' });
  }

  // Ensure JWT_SECRET is defined and convert to string
  const jwtSecret: string | undefined = process.env.JWT_SECRET || config.authsecretkey;
  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT secret is not configured properly' });
  }

  jwt.verify(token as string, jwtSecret as Secret, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
    } else {
      // Attach the decoded payload to the request object for use in other middleware or routes
      return next(decoded)
    }
  });
};

export default verifyToken;
