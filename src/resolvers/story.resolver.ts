import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Story } from 'src/entities/story.entity';
import { CreateStoryInput } from 'src/models/dtos/create-story.input';
import { StoryService } from 'src/providers/story.service';

@Resolver(() => Story)
export class StoryResolver {
    constructor(private readonly storyService: StoryService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Story)
    createStorie(@Context() context: { req: Request }, @Args('createStoryInput') createStoryInput: CreateStoryInput) {
        return this.storyService.create(context.req, createStoryInput);
    }
}
