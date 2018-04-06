import { users } from '../models/user';

export default class userHandler {
  static signupUser(req, res) {
    const userInfo = {
      id: users.length += 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password1,
      username: req.body.username,
    };
    users.push(userInfo);
    // logic is crazy but i find out when i view the array, the second to the last item is always an empty item so I'm removin it
    users.splice(users.length - 2, 1);
    return res.status(201).send({ msg: userInfo });
  }

  static loginUser(req, res) {
    const user = users.find(item => req.body.email === item.email && req.body.password === item.password);
    if (user) return res.status(200).send({ msg: `${user.name} logged in` });
    return res.status(401).send({ error: 'wrong email or password entered' });
  }
}
