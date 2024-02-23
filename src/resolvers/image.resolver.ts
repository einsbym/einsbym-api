import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImageService } from '../providers/image.service';
import { Image } from '../entities/image.entity';
import { CreateImageInput } from '../models/dtos/create-image.input';
import { UpdateImageInput } from '../models/dtos/update-image.input';

@Resolver(() => Image)
export class ImageResolver {
    constructor(private readonly imageService: ImageService) {}

    @Mutation(() => Image)
    createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
        return this.imageService.create(createImageInput);
    }

    @Query(() => [Image])
    images() {
        return this.imageService.findAll();
    }

    @Query(() => [Image])
    findImagesByUser(@Args('userId', { type: () => String }) userId: string) {
        return this.imageService.findByUser(userId);
    }

    @Query(() => Image)
    findImage(@Args('id', { type: () => String }) id: string) {
        return this.imageService.findOne(id);
    }

    @Mutation(() => Image)
    updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
        return this.imageService.update(updateImageInput.id, updateImageInput);
    }

    @Mutation(() => Image)
    removeImage(@Args('id', { type: () => String }) id: string) {
        return this.imageService.remove(id);
    }
}
