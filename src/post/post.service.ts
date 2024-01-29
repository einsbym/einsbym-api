import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async create(createPostInput: CreatePostInput) {
        const post = this.postRepository.create(createPostInput);

        const user = await this.userRepository.findOne({ where: { id: createPostInput.userId } });
        post.user = user;

        if (!user) {
            throw new NotFoundException('User not found');
        } else {
            return await this.postRepository.save(post);
        }
    }

    findAll() {
        return `This action returns all post`;
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }

    update(id: number, updatePostInput: UpdatePostInput) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
