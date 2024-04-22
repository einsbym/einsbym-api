import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Response } from './response.entity';
import { User } from './user.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class PostComment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ type: 'text' })
    @Field(() => String)
    comment: string;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @OneToMany(() => Response, (response) => response.comment)
    // @Field(() => [Response])
    responses: Response[];

    @Field(() => Int)
    totalResponses: number;

    @ManyToOne(() => User, (user) => user.comments)
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
