import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostCommentService } from '../providers/comment.service';
import { CreatePostCommentInput } from '../models/dtos/create-comment.input';
import { UpdateCommentInput } from '../models/dtos/update-comment.input';
import { PostComment } from 'src/entities/comment.entity';

@Resolver(() => PostComment)
export class CommentResolver {
    constructor(private readonly commentService: PostCommentService) {}

    @Mutation(() => PostComment)
    createComment(@Args('createCommentInput') createCommentInput: CreatePostCommentInput) {
        return this.commentService.create(createCommentInput);
    }

    // @Query(() => [Comment], { name: 'comment' })
    // findAll() {
    //     return this.commentService.findAll();
    // }

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
