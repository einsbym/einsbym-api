import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBioInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  bio: string;
}
