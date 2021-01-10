import { Op } from 'sequelize';

import Client from '../models/Client';
import Invoice from '../models/Invoice';

class DefaulterController {
  async index(req, res) {
    // const { today } = req.query;
    const today = new Date().setUTCHours(0);

    const clients = await Client.findAll({
      where: {
        is_active: true
      },
    });

    const response_array = [];
    for (const [idx, client] of clients.entries()) {
      const invoices = await Invoice.findAndCountAll({
        where: {
          client_id: client.id,
          is_paid: false,
          due_date: {
            [Op.lt]: Number(today),
          },
        },
      });

      if (invoices.count > 0) {
        client.dataValues['overdue_invoice_count'] = invoices.count;
        response_array.push(client);
      }
    };

    return res.json(response_array);
  }
}

export default new DefaulterController();
