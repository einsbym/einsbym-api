import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/controllers/post.controller';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { PostService } from 'src/providers/post.service';
import { StorageClientService } from 'src/providers/storage-client.service';
import { PostResolver } from 'src/resolvers/post.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User])],
    controllers: [PostController],
    providers: [PostResolver, PostService, StorageClientService],
    exports: [PostService],
})
export class PostModule {}
