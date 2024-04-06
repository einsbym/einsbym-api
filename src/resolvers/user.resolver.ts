import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from '../providers/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateCoverImageInput } from 'src/models/dtos/update-cover-image.input';
import { UpdateProfilePictureInput } from 'src/models/dtos/update-profile-picture.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserStatsView } from 'src/entities/views/user-stats.view';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateProfilePicture(@Args('updateProfilePictureInput') updateProfilePictureInput: UpdateProfilePictureInput) {
        return this.userService.updateProfilePicture(updateProfilePictureInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateCoverImage(@Args('updateCoverImageInput') updateCoverImageInput: UpdateCoverImageInput) {
        return this.userService.updateCoverImage(updateCoverImageInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateBio(@Args('updateBioInput') updateBioInput: UpdateBioInput) {
        return this.userService.updateBio(updateBioInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [User], { name: 'user' })
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User)
    findUserById(@Args('userId', { type: () => ID }) userId: string) {
        return this.userService.findById(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User)
    findUserByUsername(@Args('username', { type: () => String }) username: string) {
        return this.userService.findByUsername(username);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => UserStatsView)
    findUserStats(@Args('username', { type: () => String }) username: string) {
        return this.userService.fetchStats(username);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.remove(id);
    }
}
