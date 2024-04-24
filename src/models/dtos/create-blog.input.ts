import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateTagInput } from './create-tag.input';

@InputType()
export class CreateBlogInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Field title cannot be empty' })
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
