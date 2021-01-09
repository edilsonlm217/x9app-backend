import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        login: req.body.login,
      }
    });

    if (userExists) {
      return res.status(400).json({ message: 'This login is not available' });
    }

    const { id, login, name } = await User.create({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    });

    return res.json({
      id,
      login,
      name,
    });
  }
}

export default new UserController();
