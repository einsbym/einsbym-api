import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../providers/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateCoverImageInput } from 'src/models/dtos/update-cover-image.input';
import { UpdateProfilePictureInput } from 'src/models/dtos/update-profile-picture.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @Mutation(() => User)
    updateProfilePicture(@Args('updateProfilePictureInput') updateProfilePictureInput: UpdateProfilePictureInput) {
        return this.userService.updateProfilePicture(updateProfilePictureInput);
    }

    @Mutation(() => User)
    updateCoverImage(@Args('updateCoverImageInput') updateCoverImageInput: UpdateCoverImageInput) {
        return this.userService.updateCoverImage(updateCoverImageInput);
    }

    @Mutation(() => User)
    updateBio(@Args('updateBioInput') updateBioInput: UpdateBioInput) {
        return this.userService.updateBio(updateBioInput);
    }

    @Query(() => [User], { name: 'user' })
    findAll() {
        return this.userService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id', { type: () => Int }) id: string) {
        return this.userService.findOne(id);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.remove(id);
    }
}
