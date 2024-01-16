import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { env } from './env.config';

export const graphqlConfig = <ApolloDriverConfig>{
    useGlobalPrefix: env('SERVER_ROUTE_PREFIX', { defaultValue: '/' }) != '/',
    playground: env('SERVER_PLAYGROUND_ENABLED', { defaultValue: 'false' }) == 'true',
    driver: ApolloDriver,
    autoSchemaFile: true,
};
