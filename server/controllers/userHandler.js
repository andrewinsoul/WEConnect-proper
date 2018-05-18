import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { db } from '../models/index';

dotenv.load();

const { User } = db;
const key = process.env.JWT_SECRET_KEY;

export const userHandler = {
  createUser(req, res) {
    const encodedPassword = bcrypt.hashSync(req.body.password1, 8);
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: encodedPassword,
        username: req.body.username,
      })
      .then((user) => {
        const myToken = jwt.sign(
          { id: user.id },
          key, {
            expiresIn: 86400,
          },
        );
        return res.status(201).send({ auth: true, token: myToken });
      })
      .catch(error => res.status(409).send({ error: error }));
  },

  loginUser(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) return res.status(401).send({ error: 'Authentication failed, user not found' });
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({ auth: false, token: null, msg: 'incorrect password' });
        const myToken = jwt.sign(
          {
            id: user.id,
          },
          key,
          {
            expiresIn: 86400,
          },
        );
        return res.status(200).send({ auth: true, token: myToken });
      })
      .catch(error => res.status(412).send(error));
  },

};
