import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@InputType()
export class CreateUserActivityInput {
    @Field(() => User)
    user: User;

    @Field(() => String)
    description: string;
}
