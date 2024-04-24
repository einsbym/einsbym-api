import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/entities/blog.entity';
import { CreateBlogInput } from 'src/models/dtos/create-blog.input';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) {}

    async create(createBlogInput: CreateBlogInput) {
        const blog = this.blogRepository.create(createBlogInput);
        blog.tags = createBlogInput.createTagInput.tags;
        return await this.blogRepository.save(blog);
    }
}
