import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStorieInput {
    @Field(() => String, { nullable: true })
    fileName: string;

    @Field(() => String, { nullable: true })
    textStorie: string;
}
