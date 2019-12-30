import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      question: Yup.string().required('Pergunta é obrigatória'),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
