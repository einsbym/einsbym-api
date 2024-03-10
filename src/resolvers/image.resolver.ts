import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImageService } from '../providers/image.service';
import { Image } from '../entities/image.entity';
import { CreateImageInput } from '../models/dtos/create-image.input';
import { UpdateImageInput } from '../models/dtos/update-image.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Image)
export class ImageResolver {
    constructor(private readonly imageService: ImageService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Image)
    createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
        return this.imageService.create(createImageInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Image])
    images(
        @Args('page', { type: () => Int, nullable: true }) page = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit = 8,
    ) {
        // Calculate the number of posts to skip based on the page and limit parameters
        const skip = (page - 1) * limit;

        return this.imageService.findAll(skip, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Image])
    findImagesByUser(@Args('userId', { type: () => String }) userId: string) {
        return this.imageService.findByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Image)
    findRandomImage() {
        return this.imageService.findRandom();
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Image)
    updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
        return this.imageService.update(updateImageInput.id, updateImageInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Image)
    removeImage(@Args('id', { type: () => String }) id: string) {
        return this.imageService.remove(id);
    }
}
