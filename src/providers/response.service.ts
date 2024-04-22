import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/entities/response.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateResponseInput } from '../models/dtos/create-response.input';
import { UpdateResponseInput } from '../models/dtos/update-response.input';
import { PostCommentService } from './post-comment.service';

@Injectable()
export class ResponseService {
    constructor(
        @InjectRepository(Response)
        private readonly responseRepository: Repository<Response>,
        private readonly postCommentService: PostCommentService,
    ) {}

    async create(request: Request, createResponseInput: CreateResponseInput) {
        const user: User = request['user'];
        const postComment = await this.postCommentService.findById(createResponseInput.commentId);
        const response = new Response();

        response.response = createResponseInput.response;
        response.user = user;
        response.comment = postComment;

        return await this.responseRepository.save(response);
    }

    async findByPostComment(commentId: string) {
        const queryBuilder = this.responseRepository
            .createQueryBuilder('r')
            .select([
                'r.id',
                'r.response',
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
        return `This action returns a #${id} response`;
    }

    async update(request: Request, responseId: string, updateResponseInput: UpdateResponseInput) {
        const user: User = request['user'];
        const response = await this.responseRepository.findOne({ where: { id: responseId }, relations: { user: true } });

        if (response.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        response.response = updateResponseInput.response;

        return await this.responseRepository.save(response);
    }

    async remove(request: Request, responseId: string) {
        const user: User = request['user'];
        const response = await this.responseRepository.findOne({ where: { id: responseId }, relations: { user: true } });

        if (!response) {
            throw new NotFoundException('Response not found. Maybe you might have already deleted it?');
        }

        if (response.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        return await this.responseRepository.remove(response).then(() => {
            return "This response has been removed."
        });
    }
}
