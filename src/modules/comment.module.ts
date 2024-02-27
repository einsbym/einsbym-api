import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from 'src/entities/comment.entity';
import { PostCommentService } from '../providers/comment.service';
import { CommentResolver } from '../resolvers/comment.resolver';
import { PostModule } from './post.module';
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forFeature([PostComment]), PostModule, UserModule],
    providers: [CommentResolver, PostCommentService],
})
export class CommentModule {}
