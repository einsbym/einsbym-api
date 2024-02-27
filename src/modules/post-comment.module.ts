import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentService } from '../providers/post-comment.service';
import { PostCommentResolver } from '../resolvers/post-comment.resolver';
import { PostModule } from './post.module';
import { UserModule } from './user.module';
import { PostComment } from 'src/entities/post-comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PostComment]), PostModule, UserModule],
    providers: [PostCommentResolver, PostCommentService],
})
export class PostCommentModule {}
