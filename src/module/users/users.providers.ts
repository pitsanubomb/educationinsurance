import { Connection } from 'typeorm'
import { Users } from './entities/users.entity';

export const usersProviders = [
    {
        provide: 'UsersRepository',
        useFactory: (connection: Connection) => connection.getRepository(Users),
        inject: ['DbConnection'],
    },
]
