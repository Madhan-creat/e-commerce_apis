// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../configs/configs';

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.save()
    .then(() => res.status(201).json({ message: 'User registered successfully' }))
    .catch(() => res.status(400).json({ message: 'User registration unsuccessful' }));
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.comparePassword(password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

          const token = jwt.sign({ id: user._id }, config.authsecretkey, { expiresIn: '1h' });
          res.status(200).json({ token });
        })
        .catch(() => res.status(400).json({ message: 'Invalid credentials' }));
    })
    .catch(() => res.status(500).json({ error: 'Login unsuccessful' }));
};

export { register, login };
