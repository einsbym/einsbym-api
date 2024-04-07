import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
    @Field(() => ID)
    postId: string;

    @Field(() => String, { nullable: true })
    postText: string;
}
