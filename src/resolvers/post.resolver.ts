import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from '../providers/post.service';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { Post } from 'src/entities/post.entity';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Mutation(() => Post)
    createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
        return this.postService.create(createPostInput);
    }

    @Query(() => [Post])
    findPostsByUser(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 5,
    ) {
        // Calculate the number of posts to skip based on the page and limit parameters
        const skip = (page - 1) * limit;

        return this.postService.findByUser(userId, skip, limit);
    }

    @Query(() => Post)
    findPostByUser(@Args('id', { type: () => String }) id: string) {
        return this.postService.findById(id);
    }

    @Mutation(() => Post)
    updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postService.update(updatePostInput.id, updatePostInput);
    }

    @Mutation(() => Post)
    removePost(@Args('id', { type: () => Int }) id: number) {
        return this.postService.remove(id);
    }
}
