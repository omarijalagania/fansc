import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from './sequelize.config';
import { User } from '../users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
