import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const graphqlAsyncConfig = <ApolloDriverConfig>{
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        useGlobalPrefix: configService.get<boolean>('graphql.useGlobalPrefix'),
        playground: configService.get<boolean>('graphql.playground'),
        autoSchemaFile: configService.get<boolean>('graphql.autoSchemaFile'),
    }),
    inject: [ConfigService],
};
