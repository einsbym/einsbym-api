import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostComment } from './post-comment.entity';
import { Post } from './post.entity';
import { Story } from './story.entity';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true })
    @Field(() => String)
    role: string;

    @Column({ name: 'first_name' })
    @Field(() => String)
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    @Field(() => String, { nullable: true })
    lastName?: string;

    @Column({ unique: true })
    @Field(() => String)
    username: string;

    @Column({ unique: true })
    @Field(() => String)
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    bio?: string;

    @Field(() => Boolean)
    @Column({ name: 'is_private', nullable: false, default: false })
    isPrivate?: boolean;

    @Column({ name: 'profile_picture', nullable: true })
    @Field(() => String, { nullable: true })
    profilePicture?: string;

    @Column({ name: 'cover_image', nullable: true })
    @Field(() => String, { nullable: true })
    coverImage?: string;

    @OneToMany(() => Story, (storie) => storie.user)
    stories: Story[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => PostComment, (comment) => comment.user)
    comments: PostComment[];

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
