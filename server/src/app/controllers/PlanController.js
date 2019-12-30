import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Titulo é obrigatório'),
      duration: Yup.number().required('Duração é obrigatório'),
      price: Yup.number().required('Preço é obrigatório'),
    });

    schema
      .validate(req.body)
      .then(async body => {
        const { title, duration, price } = body;

        const plan = await Plan.create({ title, duration, price });

        return res.status(201).json(plan);
      })
      .catch(err => {
        return res.status(422).json({ error: err.message });
      });
  }

  async index(req, res) {
    const { page = 1, per_page = 25 } = req.query;

    if (per_page === 'all') {
      const plans = await Plan.findAll();

      return res.status(200).json(plans);
    }

    const { count: total, rows: plans } = await Plan.findAndCountAll({
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json({
      data: plans,
      meta: {
        total,
        page: Number(page),
        last_page: Number(page) >= Math.ceil(total / Number(per_page)),
      },
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    return res.status(200).json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return res.status(422).json({ error: 'Invalid request body data' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    Object.keys(req.body).map(key => {
      if (key) {
        plan[key] = req.body[key];
      }
    });

    await plan.save();

    return res.status(200).json(plan);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(422).json({ error: 'Registro não encontrado' });
    }

    await plan.destroy();

    return res.status(200).json({});
  }
}

export default new PlanController();
