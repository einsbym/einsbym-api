import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Storie } from 'src/entities/storie.entity';
import { StorieService } from 'src/providers/storie.service';
import { CreateStorieInput } from 'src/models/dtos/create-storie.input';

@Resolver(() => Storie)
export class StorieResolver {
    constructor(private readonly storieService: StorieService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Storie)
    createStorie(
        @Context() context: { req: Request },
        @Args('createStorieInput') createStorieInput: CreateStorieInput,
    ) {
        return this.storieService.create(context.req, createStorieInput);
    }
}
