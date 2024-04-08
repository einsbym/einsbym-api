import { ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        private readonly storageClientService: StorageClientService,
    ) {}

    private readonly logger = new Logger(PostService.name);

    async create(request: Request, createPostInput: CreatePostInput) {
        const user: User = request['user'];
        const post = this.postRepository.create(createPostInput);

        post.user = user;

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
                'f.id',
                'f.filename',
                'f.fileType',
                'u.id',
                'u.firstName',
                'u.lastName',
                'u.username',
                'u.profilePicture',
                'l.id',
                'l.username',
            ])
            .loadRelationCountAndMap('p.totalComments', 'p.comments')
            .loadRelationCountAndMap('p.totalLikes', 'p.likes')
            .leftJoin('p.files', 'f')
            .leftJoin('p.user', 'u')
            .leftJoin('p.likes', 'l')
            .where('u.id = :userId', { userId })
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async like(postId: string, userId: string): Promise<string> {
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: { likes: true } });
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!post || !user) {
            throw new NotFoundException('Required data not found');
        }

        if (!post.likes.some((like) => like.id === user.id)) {
            post.likes.push(user);
            await this.postRepository.save(post);
            return (await this.postRepository.save(post)).id;
        }

        return "It seems like you've liked this post already 🙃";
    }

    async unlike(postId: string, userId: string): Promise<string> {
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: { likes: true } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        post.likes = post.likes.filter((like) => like.id !== userId);

        return (await this.postRepository.save(post)).id;
    }

    async findById(postId: string) {
        const queryBuilder = this.postRepository
            .createQueryBuilder('p')
            .select([
                'p.id',
                'p.postText',
                'p.createdAt',
                'p.updatedAt',
                'u.id',
                'u.firstName',
                'u.lastName',
                'u.username',
                'u.profilePicture',
                'l.id',
                'l.username',
                'l.profilePicture',
            ])
            .loadRelationCountAndMap('p.totalComments', 'p.comments')
            .loadRelationCountAndMap('p.totalLikes', 'p.likes')
            .leftJoin('p.user', 'u')
            .leftJoin('p.likes', 'l')
            .where('p.id = :postId', { postId });

        return await queryBuilder.getOne();
    }

    async update(request: Request, updatePostInput: UpdatePostInput) {
        const user: User = request['user'];
        const post = await this.postRepository.findOne({
            where: { id: updatePostInput.postId },
            relations: { user: true },
        });

        if (post.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action');
        }

        post.postText = updatePostInput.postText;

        return await this.postRepository.save(post);
    }

    async remove(request: Request, id: string) {
        const user: User = request['user'];
        const post = await this.postRepository.findOne({ where: { id: id }, relations: { files: true, user: true } });

        if (post.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action');
        }

        for (const file of post.files) {
            try {
                await this.storageClientService.remove(file.filename);
            } catch (error) {
                throw new InternalServerErrorException('Could not remove file from storage. Check the log for details.');
            }
        }

        await this.postRepository.remove(post);

        return { message: 'post deleted successfully' };
    }
}
