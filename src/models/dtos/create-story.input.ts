import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
    @Field(() => String, { nullable: true })
    fileName: string;

    @Field(() => String, { nullable: true })
    text: string;
}
