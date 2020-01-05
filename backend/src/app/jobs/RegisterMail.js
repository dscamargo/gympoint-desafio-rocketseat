import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class RegisterMail {
  get key() {
    return 'RegisterMail';
  }

  async handle({ data }) {
    const { student, registration, plan, price } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula efetivada com sucesso.',
      template: 'register',
      context: {
        student: student.name,
        plan: plan.title,
        start: format(parseISO(registration.start_date), 'dd/MM/yyyy'),
        end: format(parseISO(registration.end_date), 'dd/MM/yyyy'),
        price: Number(price).toFixed(2),
      },
    });
  }
}

export default new RegisterMail();
