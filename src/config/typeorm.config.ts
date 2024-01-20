import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';

export const typeOrmAsyncConfig = <TypeOrmModuleAsyncOptions>{
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.database.host'),
        port: configService.get<number>('postgres.database.port'),
        username: configService.get<string>('postgres.database.username'),
        password: configService.get<string>('postgres.database.password'),
        database: configService.get<string>('postgres.database.database'),
        synchronize: configService.get<boolean>('postgres.database.synchronize'),
        entities: [Image],
        logging: ['info', 'query'],
    }),
    inject: [ConfigService],
};
