import { DataTypes } from 'sequelize';
import sequelize from '.';

export const Commands = sequelize.define(
  'commands',
  {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    guildId: DataTypes.STRING,
  },
  { timestamps: false, indexes: [{ unique: true, fields: ['name', 'guildId'] }] },
);

export const Messages = sequelize.define(
  'messages',
  {
    message: DataTypes.STRING,
    guildId: DataTypes.STRING,
  },
  { timestamps: false },
);

export const Images = sequelize.define(
  'images',
  {
    image: DataTypes.STRING,
    guildId: DataTypes.STRING,
  },
  { timestamps: false },
);

export const Platina = sequelize.define(
  'platina',
  {
    messageId: DataTypes.STRING,
  },
  { timestamps: false },
);
