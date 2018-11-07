import { createConnection } from 'typeorm'

export const databaseConnect = [
    {
        provide: 'DbConnection',
        useFactory: async () => createConnection({
            type: 'mysql',
            host: process.env.MYSQL_HOST || 'localhost',
            port: 3306,
            username: process.env.MYSQL_USERNAME || 'root',
            password: process.env.MYSQL_PASSWORD || 'root',
            database: process.env.MYSQL_DATABASE || 'educationinsurance_backend',
            entities: [
                __dirname + '/../../**/*.entity{.ts,.js}',
                __dirname + '/../../**/entities/*.entity{.ts,.js}',
            ],
            charset: 'UTF8_GENERAL_CI',
            synchronize: true,
        }),
    },
]
