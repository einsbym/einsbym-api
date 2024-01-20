import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class SigninInput {
    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    password: string;
}
