import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReplyInput {
    @Field(() => String, { description: 'The content of the reply' })
    reply: string;

    @Field(() => String, { description: 'The ID of the comment' })
    commentId: string;
}
