import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrders';
import Student from '../models/Student';

import notFound from '../../utils/notFound';

class MyHelpOrderController {
  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    const order = await HelpOrder.create({ student_id: id, question });

    return res.status(201).json(order);
  }

  async index(req, res) {
    const { id } = req.params;
    const { page = 1, per_page = 25 } = req.query;

    const { count: total, rows: order } = await HelpOrder.findAndCountAll({
      where: { student_id: id },
      limit: per_page,
      offset: (page - 1) * per_page,
      order: [['updated_at', 'DESC']],
    });

    return res.status(200).json({
      data: order,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(Number(total) / Number(per_page)),
      },
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await HelpOrder.findByPk(id);

    if (!order) {
      return notFound(res);
    }

    return res.status(200).json(order);
  }
}

export default new MyHelpOrderController();
