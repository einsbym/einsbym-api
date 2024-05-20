import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/providers/blog.service';
import { File } from '../entities/file.entity';

@Resolver(() => File)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    // @UseGuards(JwtAuthGuard)
    @Query(() => [Blog])
    findBlogPosts() {
        return this.blogService.find();
    }

    // @UseGuards(JwtAuthGuard)
    @Query(() => Blog)
    findBlogPost(@Args('id') id: string) {
        return this.blogService.findById(id);
    }
}
