import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
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
