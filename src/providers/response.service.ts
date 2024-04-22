import { Injectable } from '@nestjs/common';
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

    update(id: number, updateResponseInput: UpdateResponseInput) {
        return `This action updates a #${id} response`;
    }

    remove(id: number) {
        return `This action removes a #${id} response`;
    }
}
