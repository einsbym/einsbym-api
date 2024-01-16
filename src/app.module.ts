import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from './config/graphql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/general.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('postgres.database.host'),
                port: configService.get<number>('postgres.database.port'),
                username: configService.get<string>('postgres.database.username'),
                password: configService.get<string>('postgres.database.password'),
                database: configService.get<string>('postgres.database.database')
            }),
            inject: [ConfigService]
        }),
        GraphQLModule.forRoot(graphqlConfig),
        ImageModule,
    ],
})
export class AppModule {}
