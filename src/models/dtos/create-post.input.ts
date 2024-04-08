import { InputType, Field } from '@nestjs/graphql';
import { CreateFileInput } from './create-file.input';

@InputType()
export class CreatePostInput {
    @Field(() => String, { nullable: true })
    postText: string;

    @Field(() => [CreateFileInput], { nullable: true })
    files: CreateFileInput[];
}
