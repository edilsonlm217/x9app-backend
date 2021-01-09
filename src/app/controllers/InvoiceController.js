import Invoice from '../models/Invoice';

class InvoiceController {
  async store(req, res) {
    const new_invoice = await Invoice.create({
      // due_date: req.body.invoice_due_date,
      due_date: new Date(),
      invoice_value: req.body.invoice_value,
      is_paid: false,
      client_id: req.body.client_id
    });

    return res.json(new_invoice);
  }

  async destroy(req, res) {
    const { invoice_id } = req.body;

    const invoice = await Invoice.findByPk(invoice_id);
    await invoice.destroy();

    return res.json({ ok: true });
  }

  async update(req, res) {
    const { invoice_id, invoice_value, invoice_due_date, is_paid } = req.body;

    const invoice = await Invoice.findByPk(invoice_id);
    // invoice.due_date = invoice_due_date;
    invoice.due_date = new Date();
    invoice.invoice_value = invoice_value;
    invoice.is_paid = is_paid;

    await invoice.save();

    return res.json(invoice);
  }
}

export default new InvoiceController();
