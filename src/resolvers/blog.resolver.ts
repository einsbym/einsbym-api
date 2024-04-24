import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Blog } from 'src/entities/blog.entity';
import { Roles } from 'src/enums/roles.enum';
import { Role } from 'src/utils/decorators/role.decorator';
import { BlogService } from 'src/providers/blog.service';
import { CreateBlogInput } from 'src/models/dtos/create-blog.input';
import { RolesGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Blog)
export class BlogResolver {
    constructor(private readonly blogService: BlogService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role(Roles.ADMIN)
    @Mutation(() => Blog)
    createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
        return this.blogService.create(createBlogInput);
    }
}
