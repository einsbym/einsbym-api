import { Injectable } from '@nestjs/common';
import { CreatePostCommentInput } from '../models/dtos/create-comment.input';
import { UpdateCommentInput } from '../models/dtos/update-comment.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from 'src/entities/comment.entity';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Injectable()
export class PostCommentService {
    constructor(
        @InjectRepository(PostComment)
        private readonly postCommentRepository: Repository<PostComment>,
        private readonly postService: PostService,
        private readonly userService: UserService,
    ) {}

    async create(createCommentInput: CreatePostCommentInput) {
        const post = await this.postService.findById(createCommentInput.postId);
        const user = await this.userService.findById(createCommentInput.userId);
        const comment = new PostComment();

        comment.comment = createCommentInput.comment;
        comment.post = post;
        comment.user = user;

        return await this.postCommentRepository.save(comment);
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
