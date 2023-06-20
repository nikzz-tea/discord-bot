import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: 'db.sqlite',
  logging: console.log,
});

export default sequelize;
