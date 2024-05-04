import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/entities/reply.entity';
import { ReplyService } from '../providers/reply.service';
import { ReplyResolver } from '../resolvers/reply.resolver';
import { PostCommentModule } from './post-comment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reply]), PostCommentModule],
    providers: [ReplyResolver, ReplyService],
})
export class ReplyModule {}
