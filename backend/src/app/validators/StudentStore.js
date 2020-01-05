import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      age: Yup.number().required('Idade é obrigatório'),
      weight: Yup.number().required('Peso é obrigatório'),
      height: Yup.number().required('Altura é obrigatório'),
      email: Yup.string().required('E-mail é obrigatório'),
      name: Yup.string().required('Nome é obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
