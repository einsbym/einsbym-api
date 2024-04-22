import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostComment } from './post-comment.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ type: 'text' })
    @Field(() => String)
    response: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @ManyToOne(() => PostComment, (comment) => comment.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comment_id' })
    @Field(() => PostComment)
    comment: PostComment;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
