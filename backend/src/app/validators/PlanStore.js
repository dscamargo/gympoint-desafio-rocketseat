import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required('Titulo é obrigatório'),
      duration: Yup.number().required('Duração é obrigatório'),
      price: Yup.number().required('Preço é obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
