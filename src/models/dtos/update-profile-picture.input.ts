import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfilePictureInput {
    @Field(() => String)
    id: string;

    @Field(() => String)
    profilePicture: string;
}
