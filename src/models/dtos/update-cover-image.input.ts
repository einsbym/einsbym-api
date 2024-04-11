import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCoverImageInput {
    @Field(() => String)
    coverImage: string;
}
