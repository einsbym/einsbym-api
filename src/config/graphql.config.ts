import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const graphqlAsyncConfig = <ApolloDriverConfig>{
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        useGlobalPrefix: configService.get<boolean>('graphql.useGlobalPrefix'),
        playground: false,
        autoSchemaFile: configService.get<boolean>('graphql.autoSchemaFile'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    inject: [ConfigService],
};
