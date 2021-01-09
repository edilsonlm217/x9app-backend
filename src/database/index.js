import Sequelize from 'sequelize';

import User from '../app/models/User';
import Client from '../app/models/Client';
import Invoice from '../app/models/Invoice';

import databaseConfig from '../config/database';

const models = [User, Client, Invoice];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.connection = new Sequelize(databaseConfig);
    } catch (error) {
      console.log(error);
    }
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
