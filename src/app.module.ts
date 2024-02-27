import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/general.config';
import { graphqlAsyncConfig } from './config/graphql.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ImageModule } from './modules/image.module';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './modules/comment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        GraphQLModule.forRootAsync(graphqlAsyncConfig),
        ImageModule,
        UserModule,
        AuthModule,
        PostModule,
        CommentModule,
    ],
})
export class AppModule {}
