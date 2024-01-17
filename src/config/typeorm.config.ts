import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig = <TypeOrmModuleAsyncOptions>{
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.database.host'),
        port: configService.get<number>('postgres.database.port'),
        username: configService.get<string>('postgres.database.username'),
        password: configService.get<string>('postgres.database.password'),
        database: configService.get<string>('postgres.database.database'),
    }),
    inject: [ConfigService],
};
