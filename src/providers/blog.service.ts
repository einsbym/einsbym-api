import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/entities/blog.entity';
import { CreateBlogInput } from 'src/models/dtos/create-blog.input';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,

        private readonly storageClientService: StorageClientService,
    ) {}

    async create(createBlogInput: CreateBlogInput, files: Array<Express.Multer.File>) {
        const blog = this.blogRepository.create(createBlogInput);

        if (files.length > 0) {
            await this.storageClientService.uploadFiles(files).catch((error) => {
                throw new InternalServerErrorException(error.message);
            });
        }

        return await this.blogRepository.save(blog);
    }
}
