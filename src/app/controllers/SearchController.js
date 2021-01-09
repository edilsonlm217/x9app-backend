import { Op } from 'sequelize';

import Client from '../models/Client';

class SearchController {
  async index(req, res) {
    const { search_term } = req.query;

    const search_result = await Client.findAll({
      where: {
        name: {
          [Op.like]: `%${search_term}%`,
        },
      },
      order: [['name', 'ASC']],
    });

    return res.json(search_result);
  }
}

export default new SearchController();
