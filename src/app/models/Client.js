import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        due_date_day: Sequelize.INTEGER,
        monthly_payment: Sequelize.STRING,
        is_active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'clients',
      }
    );

    return this;
  }
}

export default Client;
