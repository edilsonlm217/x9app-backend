import Sequelize, { Model } from 'sequelize';

class Invoice extends Model {
  static init(sequelize) {
    super.init(
      {
        due_date: Sequelize.DATE,
        invoice_value: Sequelize.INTEGER,
        is_paid: Sequelize.BOOLEAN,
        client_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'invoices',
      }
    );

    return this;
  }
}

export default Invoice;
