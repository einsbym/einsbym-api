import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';

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
        }

        return await this.postRepository.save(post);
    }

    async findByUser(userId: string) {
        return await this.postRepository.find({
            where: { user: { id: userId } },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: string) {
        return await this.postRepository.findOne({
            where: { id: id },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }

    update(id: number, updatePostInput: UpdatePostInput) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
