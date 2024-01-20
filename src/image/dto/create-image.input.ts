import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => [String])
    tags: string[];
}
