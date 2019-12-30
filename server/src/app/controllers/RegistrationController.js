import { parseISO, format, addMonths } from 'date-fns';
import * as Yup from 'yup';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import RegisterJob from '../jobs/RegisterMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required('O aluno é obrigatório'),
      plan_id: Yup.number().required('Plano é obrigatório'),
      start_date: Yup.string().required('Data de início é obrigatório'),
    });

    schema
      .validate(req.body)
      .then(async value => {
        const { student_id, plan_id, start_date } = value;

        const student = await Student.findByPk(student_id);

        const plan = await Plan.findByPk(plan_id);

        if (!student || !plan) {
          return res.status(422).json({ error: 'Registro não encontrado' });
        }

        const end_date = addMonths(parseISO(start_date), plan.duration);
        const price = Number(plan.duration) * Number(plan.price);

        const data = {
          student_id: Number(student_id),
          plan_id: Number(plan_id),
          start_date,
          end_date: format(end_date, 'yyyy-MM-dd'),
          price: Number(price.toFixed(2)),
        };

        const registration = await Registration.create(data);

        await Queue.add(RegisterJob.key, {
          student,
          registration,
          plan,
          price,
        });

        return res.status(201).json(registration);
      })
      .catch(err => {
        return res.status(422).json({ error: err.message });
      });
  }

  async index(req, res) {
    const { page = 1, per_page = 25 } = req.query;

    const {
      count: total,
      rows: registrations,
    } = await Registration.findAndCountAll({
      limit: per_page,
      offset: (page - 1) * per_page,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [{ model: Student, as: 'student' }, { model: Plan, as: 'plan' }],
    });

    return res.status(200).json({
      data: registrations,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(Number(total) / Number(per_page)),
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.string(),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return res.status(422).json({ error: 'Invalid request body data' });
    }

    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    Object.keys(req.body).map(key => {
      if (key) {
        registration[key] = req.body[key];
      }
    });

    await registration.save();

    return res.status(200).json(registration);
  }

  async show(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id, {
      include: [{ model: Student, as: 'student' }, { model: Plan, as: 'plan' }],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    if (!registration) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    return res.status(200).json(registration);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    await registration.destroy();

    return res.status(200).json({});
  }
}

export default new RegistrationController();
