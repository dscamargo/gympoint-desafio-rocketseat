import * as Yup from 'yup';

import notFound from '../../utils/notFound';

import HelpOrder from '../models/HelpOrders';
import Student from '../models/Student';
import AnswerJob from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, per_page = 25 } = req.query;
    const { count: total, rows: orders } = await HelpOrder.findAndCountAll({
      limit: per_page,
      offset: (page - 1) * per_page,
      where: { answer: null, answer_at: null },
      include: [{ model: Student, as: 'student' }],
      attributes: ['id', 'question', 'answer', 'answer_at'],
    });

    return res.status(200).json({
      data: orders,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(Number(total) / Number(per_page)),
      },
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await HelpOrder.findByPk(id, {
      include: [{ model: Student, as: 'student' }],
    });

    if (!order) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    return res.status(200).json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required('A resposta é obrigatória'),
    });

    schema
      .validate(req.body)
      .then(async body => {
        const { answer } = body;
        const { id } = req.params;

        const order = await HelpOrder.findByPk(id, {
          include: [{ model: Student, as: 'student' }],
        });

        if (!order) {
          return notFound(res);
        }

        order.answer = answer;
        order.answer_at = new Date();

        await order.save();

        await Queue.add(AnswerJob.key, {
          order,
        });

        return res.status(200).json(order);
      })
      .catch(err => {
        return res.json({ error: err.message });
      });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const order = await HelpOrder.findByPk(id);

    if (!order) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    await order.destroy();

    return res.status(200).json({});
  }
}

export default new HelpOrderController();
