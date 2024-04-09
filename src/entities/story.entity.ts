import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Story {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true, name: 'filename' })
    @Field(() => String)
    filename: string;

    @Column({ nullable: true, name: 'text' })
    @Field(() => String)
    text: string;

    @ManyToOne(() => User, (user) => user.stories)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
