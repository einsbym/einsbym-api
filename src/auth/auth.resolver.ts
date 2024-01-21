import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput } from './dto/signin.input';
import { User } from 'src/user/entities/user.entity';

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
}
