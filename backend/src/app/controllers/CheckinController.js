import { startOfWeek, endOfWeek } from 'date-fns';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    const { count } = await Checkin.findAndCountAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startOfWeek(new Date()), endOfWeek(new Date())],
        },
      },
    });

    if (count >= 5) {
      return res
        .status(422)
        .json({ error: 'Atingiu número máximo de checkins na semana' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.status(201).json(checkin);
  }

  async index(req, res) {
    const { page = 1, per_page = 25 } = req.query;
    const { id } = req.params;

    const user = await Student.findByPk(id);

    if (!user) {
      return res.status(422).json({ error: 'Usuário não encontrado' });
    }

    const { count: total, rows: checkins } = await Checkin.findAndCountAll({
      limit: per_page,
      offset: (page - 1) * per_page,
      where: { student_id: id },
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      data: checkins,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(Number(total) / Number(per_page)),
      },
    });
  }
}

export default new CheckinController();
