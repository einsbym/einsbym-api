import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from 'src/entities/post-comment.entity';
import { PostCommentService } from '../providers/post-comment.service';
import { PostCommentResolver } from '../resolvers/post-comment.resolver';
import { PostModule } from './post.module';

@Module({
    imports: [TypeOrmModule.forFeature([PostComment]), PostModule],
    providers: [PostCommentResolver, PostCommentService],
})
export class PostCommentModule {}
