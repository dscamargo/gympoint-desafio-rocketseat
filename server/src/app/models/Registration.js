import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter, parseISO } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.STRING,
        end_date: Sequelize.STRING,
        price: Sequelize.FLOAT,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(parseISO(this.get('start_date')), new Date()) &&
              isAfter(parseISO(this.get('end_date')), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { as: 'student', foreignKey: 'student_id' });
    this.belongsTo(models.Plan, { as: 'plan', foreignKey: 'plan_id' });
  }
}

export default Registration;
