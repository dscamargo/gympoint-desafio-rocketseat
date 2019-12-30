export default function registerNotFound(res) {
  return res.status(422).json({ error: 'Registro não encontrado' });
}
