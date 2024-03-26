import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from '../providers/post.service';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { Post } from 'src/entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Message } from 'src/models/dtos/message.dto';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Post)
    createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
        return this.postService.create(createPostInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Post])
    findPostsByUser(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int, nullable: true }) page = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit = 5,
    ) {
        // Calculate the number of posts to skip based on the page and limit parameters
        const skip = (page - 1) * limit;

        return this.postService.findByUser(userId, skip, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    likePost(@Args('postId') postId: string, @Args('userId') userId: string) {
        return this.postService.likePost(postId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    unlikePost(@Args('postId') postId: string, @Args('userId') userId: string) {
        return this.postService.unlikePost(postId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Post)
    findPostById(@Args('postId') postId: string) {
        return this.postService.findById(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Post)
    updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postService.update(updatePostInput.id, updatePostInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Message)
    removePost(@Args('id', { type: () => String }) id: string) {
        return this.postService.remove(id);
    }
}
