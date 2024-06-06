import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserActivityInput {
    @Field(() => String)
    userId: string;

    @Field(() => String)
    description: string;
}
