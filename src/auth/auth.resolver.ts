import { Resolver, Mutation, Args, ObjectType, Field, Query } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { SigninInput } from '../auth/dto/signin.input';
import { User } from 'src/entities/user.entity';

@ObjectType()
export class Auth {
    @Field(() => String)
    accessToken: string;

    @Field(() => User)
    user: User;
}

@Resolver(() => Auth)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => Auth)
    signin(@Args('signin') signinInput: SigninInput) {
        return this.authService.signIn(signinInput);
    }

    @Query(() => User)
    me(@Args('id') id: string) {
        return this.authService.getUser(id);
    }
}
