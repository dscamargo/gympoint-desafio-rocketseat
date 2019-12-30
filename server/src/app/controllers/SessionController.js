import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(422).json({ error: 'Usuário não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, user.password_hash);

    if (!checkPassword) {
      return res.status(422).json({ error: 'Senha incorreta' });
    }

    const { name, id } = user;

    const token = jwt.sign(
      { data: { id, email, name } },
      process.env.APP_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ user, token });
  }
}

export default new SessionController();
