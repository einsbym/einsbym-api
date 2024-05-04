import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Reply } from '../entities/reply.entity';
import { CreateReplyInput } from '../models/dtos/create-reply.input';
import { UpdateReplyInput } from '../models/dtos/update-reply.input';
import { ReplyService } from '../providers/reply.service';

@Resolver(() => Reply)
export class ReplyResolver {
    constructor(private readonly replyService: ReplyService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Reply)
    createReply(
        @Context() context: { req: Request },
        @Args('createReplyInput') createReplyInput: CreateReplyInput,
    ) {
        return this.replyService.create(context.req, createReplyInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Reply])
    findRepliesByPostComment(@Args('commentId') commentId: string) {
        return this.replyService.findByPostComment(commentId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Reply)
    findReplyById(@Args('id', { type: () => Int }) id: number) {
        return this.replyService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Reply)
    updateReply(
        @Context() context: { req: Request },
        @Args('replyId') replyId: string,
        @Args('updateReplyInput') updateReplyInput: UpdateReplyInput,
    ) {
        return this.replyService.update(context.req, replyId, updateReplyInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    removeReply(@Context() context: { req: Request }, @Args('replyId') replyId: string) {
        return this.replyService.remove(context.req, replyId);
    }
}
