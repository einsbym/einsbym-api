import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { StorageClientService } from './storage-client.service';
import { UserService } from './user.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly storageClientService: StorageClientService,
        private readonly userService: UserService,
    ) {}

    private readonly logger = new Logger(PostService.name);

    async create(request: Request, createPostInput: CreatePostInput, files: Array<Express.Multer.File>) {
        if (!createPostInput.postText && files.length === 0) {
            throw new BadRequestException(
                'You need to write something or at least select a file in order to save the post.',
            );
        }

        const user: User = request['user'];
        const post = this.postRepository.create(createPostInput);

        let savedFiles: File[];

        if (files.length > 0) {
            savedFiles = await this.storageClientService.uploadFiles(files).catch((error) => {
                throw new InternalServerErrorException(error.message);
            });
        }

        post.user = user;
        post.files = savedFiles;

        await this.userService.createJob({
            user: user,
            description: `${user.firstName} created a post.`,
        });

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

    async like(request: Request, postId: string): Promise<string> {
        const user: User = request['user'];
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: { likes: true } });

        if (!post) {
            throw new NotFoundException('No post found.');
        }

        if (!post.likes.some((like) => like.id === user.id)) {
            post.likes.push(user);

            await this.postRepository.save(post);

            const likedPostId = (await this.postRepository.save(post)).id;

            await this.userService.createJob({
                user: user,
                description: `${user.firstName} liked a post.`,
            });

            return likedPostId;
        }

        return "It seems like you've liked this post already 🙃";
    }

    async unlike(request: Request, postId: string): Promise<string> {
        const user: User = request['user'];
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: { likes: true } });

        post.likes = post.likes.filter((like) => like.id !== user.id);

        const unlikedPostId = (await this.postRepository.save(post)).id;

        await this.userService.createJob({
            user: user,
            description: `${user.firstName} unliked a post.`,
        });

        return unlikedPostId;
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
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        post.postText = updatePostInput.postText;

        const updatedPost = await this.postRepository.save(post);

        await this.userService.createJob({
            user: user,
            description: `${user.firstName} updated their post.`,
        });

        return updatedPost;
    }

    async remove(request: Request, id: string) {
        const user: User = request['user'];
        const post = await this.postRepository.findOne({ where: { id: id }, relations: { files: true, user: true } });

        if (post.user.id !== user.id) {
            throw new ForbiddenException('You are not allowed to perform this action.');
        }

        for (const file of post.files) {
            try {
                await this.storageClientService.remove(file.filename);
            } catch (error) {
                throw new InternalServerErrorException(
                    'Could not remove file from storage. Check the log for details.',
                );
            }
        }

        await this.postRepository.remove(post);
        await this.userService.createJob({
            user: user,
            description: `${user.firstName} removed their post.`,
        });

        return { message: 'Post deleted successfully!' };
    }
}
