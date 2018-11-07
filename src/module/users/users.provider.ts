import 'reflect-metadata'
import { Connection } from 'typeorm'
import { Users } from './entities/users.entity';
export const usersProvider = [
  {
    provide: 'UsersRepository',
    usefactory: (connect: Connection) => connect.getRepository(Users),
    inject: ['DbConnection'],
  },
]
