import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Response } from '../entities/response.entity';
import { CreateResponseInput } from '../models/dtos/create-response.input';
import { UpdateResponseInput } from '../models/dtos/update-response.input';
import { ResponseService } from '../providers/response.service';

@Resolver(() => Response)
export class ResponseResolver {
    constructor(private readonly responseService: ResponseService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Response)
    createResponse(
        @Context() context: { req: Request },
        @Args('createResponseInput') createResponseInput: CreateResponseInput,
    ) {
        return this.responseService.create(context.req, createResponseInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Response])
    findResponsesByPostComment(@Args('commentId') commentId: string) {
        return this.responseService.findByPostComment(commentId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Response, { name: 'response' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.responseService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Response)
    updateResponse(
        @Context() context: { req: Request },
        @Args('responseId') responseId: string,
        @Args('updateResponseInput') updateResponseInput: UpdateResponseInput,
    ) {
        return this.responseService.update(context.req, responseId, updateResponseInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    removeResponse(@Context() context: { req: Request }, @Args('responseId') responseId: string) {
        return this.responseService.remove(context.req, responseId);
    }
}
