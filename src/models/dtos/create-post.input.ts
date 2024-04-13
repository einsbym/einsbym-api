import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field(() => String, { nullable: true })
    postText: string;
}
