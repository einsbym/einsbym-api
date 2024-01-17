import { ApolloDriver } from '@nestjs/apollo';
import { ConfigProps } from 'src/interfaces/config.interface';

export const config = (): ConfigProps => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
    api: {
        apiUrl: '',
        httpTimeout: 1000,
    },
    postgres: {
        database: {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
    },
    graphql: {
        autoSchemaFile: true,
        playground: true,
    },
});
