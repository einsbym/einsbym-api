import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

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

    @Column({ name: 'profile_picture', nullable: true })
    @Field(() => String, { nullable: true })
    profilePicture?: string;

    @Column({ name: 'cover_image', nullable: true })
    @Field(() => String, { nullable: true })
    coverImage?: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: number;
}
