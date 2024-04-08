import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Storie {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true, name: 'file_name' })
    @Field(() => String)
    fileName: string;

    @Column({ nullable: true, name: 'text_storie' })
    @Field(() => String)
    textStorie: string;

    @ManyToOne(() => User, (user) => user.stories)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;
}
