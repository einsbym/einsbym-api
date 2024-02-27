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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Image } from './image.entity';
import { User } from './user.entity';
import { PostComment } from './comment.entity';

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ name: 'post_text', type: 'text', nullable: true })
    @Field(() => String, { nullable: true })
    postText: string;

    @OneToMany(() => Image, (image) => image.post, { cascade: true })
    @Field(() => [Image])
    images: Image[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @OneToMany(() => PostComment, (comment) => comment.post)
    comments: PostComment[];

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: number;
}
