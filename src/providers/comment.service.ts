import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from '../models/dtos/create-comment.input';
import { UpdateCommentInput } from '../models/dtos/update-comment.input';

@Injectable()
export class CommentService {
    create(createCommentInput: CreateCommentInput) {
        return 'This action adds a new comment';
    }

    findAll() {
        return `This action returns all comment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentInput: UpdateCommentInput) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
