import { Args, Query, Resolver } from '@nestjs/graphql';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/providers/blog.service';
import { File } from '../entities/file.entity';

@Resolver(() => File)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    @Query(() => [Blog])
    findBlogPosts() {
        return this.blogService.find();
    }

    @Query(() => Blog)
    findBlogPost(@Args('slug') slug: string) {
        return this.blogService.findBySlug(slug);
    }
}
