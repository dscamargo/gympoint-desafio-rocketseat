import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().required('Email é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
