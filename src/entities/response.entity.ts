import { Field } from '@nestjs/graphql';
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
export class Response {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    response: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @ManyToOne(() => PostComment, (comment) => comment.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comment_id' })
    comment: PostComment;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
