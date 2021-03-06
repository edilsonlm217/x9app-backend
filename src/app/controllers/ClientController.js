import { parseISO, format, addMonths } from 'date-fns';

import Client from '../models/Client';
import Invoice from '../models/Invoice';

class ClientController {
  async index(req, res) {
    const clients = await Client.findAll();

    return res.json(clients);
  }

  async store(req, res) {
    const client = await Client.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      street: req.body.street,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      due_date_day: parseInt(format(parseISO(req.body.due_date_day), 'dd')),
      monthly_payment: req.body.monthly_payment,
      is_active: true,
    });

    const max_invoice_amount = 6;
    const invoices_array = [];

    for (let i = 0; i < max_invoice_amount; i++) {
      invoices_array.push({
        due_date: addMonths(parseISO(req.body.due_date_day), i),
        invoice_value: parseInt(req.body.monthly_payment),
        is_paid: false,
        client_id: client.id,
      });
    }

    await Invoice.bulkCreate(invoices_array);

    return res.json({ ok: true });
  }

  async show(req, res) {
    const { client_id } = req.body;

    const client = await Client.findByPk(client_id);

    const invoices = await Invoice.findAll({
      where: {
        client_id,
      },
    });

    return res.json({
      ...client.dataValues,
      invoices: Object.values(invoices),
    });
  }
}

export default new ClientController();
