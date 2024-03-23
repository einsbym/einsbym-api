import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
    @Field(() => String)
    filename: string;

    @Field(() => String)
    fileType: string;
}
