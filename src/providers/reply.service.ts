import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from 'src/entities/reply.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReplyInput } from '../models/dtos/create-reply.input';
import { UpdateReplyInput } from '../models/dtos/update-reply.input';
import { PostCommentService } from './post-comment.service';

@Injectable()
export class ReplyService {
    constructor(
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>,
        private readonly postCommentService: PostCommentService,
    ) {}

    async create(request: Request, createReplyInput: CreateReplyInput) {
        const user: User = request['user'];
        const postComment = await this.postCommentService.findById(createReplyInput.commentId);
        const reply = new Reply();

        reply.reply = createReplyInput.reply;
        reply.user = user;
        reply.comment = postComment;

        return await this.replyRepository.save(reply);
    }

    async findByPostComment(commentId: string) {
        const queryBuilder = this.replyRepository
            .createQueryBuilder('r')
            .select([
                'r.id',
                'r.reply',
                'r.createdAt',
                'r.updatedAt',
                'u.id',
                'u.username',
                'u.profilePicture',
                'pc.id',
            ])
            .leftJoin('r.user', 'u')
            .leftJoin('r.comment', 'pc')
            .where('pc.id = :commentId', { commentId });

        return await queryBuilder.getMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} reply`;
    }

    async update(request: Request, replyId: string, updateReplyInput: UpdateReplyInput) {
        const user: User = request['user'];
        const reply = await this.replyRepository.findOne({ where: { id: replyId }, relations: { user: true } });

        if (reply.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        reply.reply = updateReplyInput.reply;

        return await this.replyRepository.save(reply);
    }

    async remove(request: Request, replyId: string) {
        const user: User = request['user'];
        const reply = await this.replyRepository.findOne({ where: { id: replyId }, relations: { user: true } });

        if (!reply) {
            throw new NotFoundException('Reply not found. Maybe you might have already deleted it?');
        }

        if (reply.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        return await this.replyRepository.remove(reply).then(() => {
            return "This reply has been removed."
        });
    }
}
