import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfilePictureInput {
    @Field(() => String)
    profilePicture: string;
}
