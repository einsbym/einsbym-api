import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/post/entities/post.entity';
import { Response } from 'src/response/entities/response.entity';
import { User } from 'src/user/entities/user.entity';

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
        entities: [User, Image, Post, Comment, Response],
        logging: ['info', 'query'],
    }),
    inject: [ConfigService],
};
