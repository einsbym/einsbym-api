import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateCoverImageInput } from './dto/update-cover-image.input';
import { UpdateProfilePictureInput } from './dto/update-profile-picture.input';

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
