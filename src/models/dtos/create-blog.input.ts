import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogInput {
    @IsNotEmpty({ message: 'The title field cannot be empty' })
    @IsString({ message: 'The title field must be string type' })
    title: string;

    @IsNotEmpty({ message: 'The description field cannot be empty' })
    @IsString({ message: 'The description field must be string type' })
    description: string;

    @IsNotEmpty({ message: 'The body field cannot be empty' })
    body: string;

    tags: string[];
}
