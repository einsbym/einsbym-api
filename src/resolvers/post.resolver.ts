import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Post } from 'src/entities/post.entity';
import { Message } from 'src/models/dtos/message.dto';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { PostService } from '../providers/post.service';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

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
    likePost(@Context() context: { req: Request }, @Args('postId') postId: string) {
        return this.postService.like(context.req, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    unlikePost(@Context() context: { req: Request }, @Args('postId') postId: string) {
        return this.postService.unlike(context.req, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Post)
    findPostById(@Args('postId') postId: string) {
        return this.postService.findById(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Post)
    updatePost(@Context() context: { req: Request }, @Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postService.update(context.req, updatePostInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Message)
    removePost(@Context() context: { req: Request }, @Args('id', { type: () => String }) id: string) {
        return this.postService.remove(context.req, id);
    }
}
