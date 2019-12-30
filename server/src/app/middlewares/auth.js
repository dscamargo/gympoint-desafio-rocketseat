import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const haveToken = !!req.headers.authorization;

  if (!haveToken) {
    return res.status(401).json({ error: 'Token não disponível' });
  }

  const [, token] = req.headers.authorization.split(' ');

  try {
    const decoded = await jwt.verify(token, process.env.APP_SECRET);

    const { id, name, email } = decoded;

    req.loggedUser = { id, name, email };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'O token expirou' });
  }
};
