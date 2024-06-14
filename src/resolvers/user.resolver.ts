import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserActivity } from 'src/entities/user-activity.entity';
import { User } from 'src/entities/user.entity';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { Roles } from 'src/enums/roles.enum';
import { RoleGraphqlGuard } from 'src/guards/role-graphql.guard';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { Message } from 'src/models/dtos/message.dto';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UserService } from '../providers/user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateBio(@Context() context: { req: Request }, @Args('updateBioInput') updateBioInput: UpdateBioInput) {
        return this.userService.updateBio(context.req, updateBioInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    updateUserVisibility(@Context() context: { req: Request }, @Args('isPrivate') isPrivate: boolean) {
        return this.userService.updateVisibility(context.req, isPrivate);
    }

    @UseGuards(JwtAuthGuard, RoleGraphqlGuard)
    @Role(Roles.ADMIN)
    @Mutation(() => Message)
    updateRole(@Context() context: { req: Request }, @Args('role') role: Roles) {
        return this.userService.updateRole(context.req, role);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [User])
    findAllUsers() {
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
    @Query(() => [UserActivity])
    findActivities(@Context() context: { req: Request }): Promise<UserActivity[]> {
        return this.userService.findActivities(context.req);
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

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    follow(@Args('followingId', { type: () => String }) followingId: string, @Context() context: { req: Request }) {
        return this.userService.follow(followingId, context.req);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => User)
    unfollow(@Args('followingId', { type: () => String }) followingId: string, @Context() context: { req: Request }) {
        return this.userService.unfollow(followingId, context.req);
    }
}
