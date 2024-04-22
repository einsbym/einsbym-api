import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from 'src/entities/response.entity';
import { ResponseService } from '../providers/response.service';
import { ResponseResolver } from '../resolvers/response.resolver';
import { PostCommentModule } from './post-comment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Response]), PostCommentModule],
    providers: [ResponseResolver, ResponseService],
})
export class ResponseModule {}
