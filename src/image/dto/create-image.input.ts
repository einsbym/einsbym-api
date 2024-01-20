import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => [String])
    tags: string[];

    @Field(() => ID)
    userId: string;
}
