import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBioInput {
    @Field(() => String)
    bio: string;
}
