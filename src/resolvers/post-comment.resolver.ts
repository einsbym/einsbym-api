import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostCommentService } from '../providers/post-comment.service';
import { CreatePostCommentInput } from '../models/dtos/create-post-comment.input';
import { UpdateCommentInput } from '../models/dtos/update-post-comment.input';
import { PostComment } from 'src/entities/post-comment.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => PostComment)
export class PostCommentResolver {
    constructor(private readonly commentService: PostCommentService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => PostComment)
    createComment(@Args('createCommentInput') createCommentInput: CreatePostCommentInput): Promise<PostComment> {
        return this.commentService.create(createCommentInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [PostComment])
    findCommentsByPost(@Args('postId') postId: string): Promise<PostComment[]> {
        return this.commentService.findByPost(postId);
    }

    // @Query(() => Comment, { name: 'comment' })
    // findOne(@Args('id', { type: () => Int }) id: number) {
    //     return this.commentService.findOne(id);
    // }

    // @Mutation(() => Comment)
    // updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    //     return this.commentService.update(updateCommentInput.id, updateCommentInput);
    // }

    // @Mutation(() => Comment)
    // removeComment(@Args('id', { type: () => Int }) id: number) {
    //     return this.commentService.remove(id);
    // }
}
