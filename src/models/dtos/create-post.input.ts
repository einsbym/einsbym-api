import { InputType, Field } from '@nestjs/graphql';
import { CreateImageInput } from './create-image.input';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  userId: string;

  @Field(() => [CreateImageInput], { nullable: true })
  images: CreateImageInput[];

  @Field(() => String)
  postText: string;
}
