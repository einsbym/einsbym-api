import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResponseInput {
    @Field(() => String, { description: 'The content of the response' })
    response: string;

    @Field(() => String, { description: 'The ID of the comment' })
    commentId: string;
}
