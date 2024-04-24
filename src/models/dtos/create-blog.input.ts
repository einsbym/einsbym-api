import { Field, InputType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';

@InputType()
export class CreateBlogInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    filename: string;

    @Field(() => String)
    body: string;

    @Field(() => Number)
    views: number;

    @Field(() => CreateTagInput)
    createTagInput: CreateTagInput;
}
