import { CreatePostCommentInput } from './create-post-comment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput extends PartialType(CreatePostCommentInput) {
  @Field(() => Int)
  id: number;
}
