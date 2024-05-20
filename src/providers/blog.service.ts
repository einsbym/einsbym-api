import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
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

    async create(createBlogInput: CreateBlogInput, file: Express.Multer.File) {
        const blog = this.blogRepository.create(createBlogInput);
        const uploadedFile = await this.storageClientService.uploadFile(file).catch((error) => {
            throw new InternalServerErrorException(error.message);
        });

        blog.filename = uploadedFile.filename;

        return await this.blogRepository.save(blog);
    }

    async find() {
        return await this.blogRepository.find();
    }

    async findById(id: string) {
        const post = await this.blogRepository.findOneBy({ id: id });
        console.log(post);
        return post;
    }
}
