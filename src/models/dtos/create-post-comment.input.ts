import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostCommentInput {
    @Field(() => String, { description: 'The content' })
    comment: string;

    @Field(() => String, { description: 'The ID of the post' })
    postId: string;
}
