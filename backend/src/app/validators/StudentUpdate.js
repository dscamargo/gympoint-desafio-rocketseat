import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
      email: Yup.string(),
      name: Yup.string(),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      throw new Error();
    }
    return next();
  } catch (error) {
    return res.status(422).json({ error: 'Validation fails' });
  }
};
