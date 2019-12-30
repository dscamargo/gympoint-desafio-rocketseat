import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.student.name} <${order.student.email}>`,
      subject: 'Sua pergunta foi respondida.',
      template: 'answer',
      context: {
        studentName: order.student.name,
        questionDate: format(parseISO(order.createdAt), 'dd/MM/yyyy'),
        question: order.question,
        answer: order.answer,
        answerDate: format(parseISO(order.answer_at), 'dd/MM/yyyy'),
      },
    });
  }
}

export default new AnswerMail();
