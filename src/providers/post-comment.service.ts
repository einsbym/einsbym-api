import { Injectable } from '@nestjs/common';
import { CreatePostCommentInput } from '../models/dtos/create-post-comment.input';
import { UpdateCommentInput } from '../models/dtos/update-post-comment.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PostComment } from 'src/entities/post-comment.entity';

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

    async findByPost(postId: string): Promise<PostComment[]> {
        const queryBuilder = await this.postCommentRepository
            .createQueryBuilder('pc')
            .select([
                'pc.id',
                'pc.comment',
                'pc.createdAt',
                'u.id',
                'u.username',
                'u.firstName',
                'u.profilePicture',
                'p.id',
            ])
            .leftJoin('pc.user', 'u')
            .leftJoin('pc.post', 'p')
            .where('p.id = :postId', { postId })
            .orderBy('pc.createdAt', 'DESC')
            .getMany();

        return queryBuilder;
    }

    update(id: number, updateCommentInput: UpdateCommentInput) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
