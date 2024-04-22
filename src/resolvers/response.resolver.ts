import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ResponseService } from '../providers/response.service';
import { Response } from '../entities/response.entity';
import { CreateResponseInput } from '../models/dtos/create-response.input';
import { UpdateResponseInput } from '../models/dtos/update-response.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

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
    @Query(() => [Response], { name: 'response' })
    findAll() {
        return this.responseService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Response, { name: 'response' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.responseService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Response)
    updateResponse(@Args('updateResponseInput') updateResponseInput: UpdateResponseInput) {
        return this.responseService.update(updateResponseInput.id, updateResponseInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Response)
    removeResponse(@Args('id', { type: () => Int }) id: number) {
        return this.responseService.remove(id);
    }
}
