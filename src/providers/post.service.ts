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

    async findByUser(userId: string, skip: number, take: number) {
        const queryBuilder = this.postRepository
            .createQueryBuilder('p')
            .select([
                'p.id',
                'p.postText',
                'p.createdAt',
                'p.updatedAt',
                'i.id',
                'i.filename',
                'u.id',
                'u.firstName',
                'u.lastName',
                'u.username',
                'u.profilePicture',
            ])
            .loadRelationCountAndMap('p.totalComments', 'p.comments')
            .leftJoin('p.images', 'i')
            .leftJoin('p.user', 'u')
            .where('u.id = :userId', { userId })
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async findById(id: string) {
        return await this.postRepository.findOneBy({ id: id });
    }

    update(id: number, updatePostInput: UpdatePostInput) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
