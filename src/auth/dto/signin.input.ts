import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}
