import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserActivityInput {
    @Field(() => String)
    user_id: string;

    @Field(() => String)
    activity_type: string;
}
