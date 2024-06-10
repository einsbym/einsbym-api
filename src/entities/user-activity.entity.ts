import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class UserActivity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @ManyToOne(() => User, (user) => user.userActivities)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @Column({ type: 'varchar' })
    @Field(() => String)
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;
}
