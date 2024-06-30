import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { User } from 'src/entities/user.entity';
import { CreateBlogInput } from 'src/models/dtos/create-blog.input';
import { Repository } from 'typeorm';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        private readonly storageClientService: StorageClientService,
    ) {}

    private sanitizeTitle(title: string): string {
        // Remove special characters and replace spaces with dashes
        const sanitized = title
            .toLowerCase() // Convert to lowercase
            .normalize('NFD') // Normalize to NFD form to separate characters from their diacritical marks
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except for alphanumeric, spaces, and dashes
            .trim() // Remove leading and trailing whitespace
            .replace(/\s+/g, '-'); // Replace spaces with dashes

        return sanitized;
    }

    async create(request: Request, createBlogInput: CreateBlogInput, file: Express.Multer.File) {
        const user: User = request['user'];
        const blog = new Blog();

        // Generate slug
        const slug = this.sanitizeTitle(createBlogInput.title);

        blog.filename = 'image.png';
        blog.title = createBlogInput.title;
        blog.slug = slug;
        blog.description = createBlogInput.description;
        blog.tags = JSON.parse(createBlogInput.tags);
        blog.body = JSON.parse(createBlogInput.body);
        blog.user = user;

        if (blog.body.blocks.length === 0) {
            throw new BadRequestException('The body of the post was not provided.');
        }

        // const uploadedFile = await this.storageClientService.uploadFile(file).catch((error) => {
        //     throw new InternalServerErrorException(error.message);
        // });

        // blog.filename = uploadedFile.filename;

        return await this.blogRepository.save(blog);
    }

    async find() {
        return await this.blogRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findBySlug(slug: string) {
        return await this.blogRepository.findOne({ where: { slug: slug }, relations: { user: true } });
    }
}
