import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCoverImageInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  coverImage: string
}
