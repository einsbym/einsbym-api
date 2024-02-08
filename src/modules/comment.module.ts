import { Module } from '@nestjs/common';
import { CommentService } from '../providers/comment.service';
import { CommentResolver } from '../resolvers/comment.resolver';

@Module({
    providers: [CommentResolver, CommentService],
})
export class CommentModule {}
