import { Op } from 'sequelize';
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      age: Yup.number().required('Idade é obrigatório'),
      weight: Yup.number().required('Peso é obrigatório'),
      height: Yup.number().required('Altura é obrigatório'),
      email: Yup.string().required('E-mail é obrigatório'),
      name: Yup.string().required('Nome é obrigatório'),
    });

    const valid = await schema.isValid(req.body);

    if (!valid) {
      return res.status(422).json({ error: 'invalid body data' });
    }

    const student = await Student.create(req.body);

    return res.status(201).json(student);
  }

  async index(req, res) {
    const { page = 1, per_page = 25, q = '' } = req.query;

    const { count: total, rows: students } = await Student.findAndCountAll({
      limit: per_page,
      offset: (page - 1) * per_page,
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
    });

    return res.status(200).json({
      data: students,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(total / Number(per_page)),
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
      email: Yup.string(),
      name: Yup.string(),
    });

    const validate = await schema.isValid(req.body);

    if (!validate) {
      return res.status(422).json({ error: 'invalid data' });
    }

    const { id } = req.params;

    const user = await Student.findByPk(id);

    if (!user) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    Object.keys(req.body).map(key => {
      if (key) {
        user[key] = req.body[key];
      }
    });

    await user.save();

    return res.status(200).json(user);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    return res.status(200).json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const user = await Student.findByPk(id);

    if (!user) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    await user.destroy();

    return res.status(200).json({});
  }
}

export default new StudentController();
