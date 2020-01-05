import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number().required('O aluno é obrigatório'),
      plan_id: Yup.number().required('Plano é obrigatório'),
      start_date: Yup.string().required('Data de início é obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};
