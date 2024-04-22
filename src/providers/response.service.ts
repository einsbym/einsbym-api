import { Injectable } from '@nestjs/common';
import { CreateResponseInput } from '../models/dtos/create-response.input';
import { UpdateResponseInput } from '../models/dtos/update-response.input';
import { User } from 'src/entities/user.entity';
import { Response } from 'src/entities/response.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from './post.service';
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

    findAll() {
        return `This action returns all response`;
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
