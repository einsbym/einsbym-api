import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { File } from './file.entity';
import { User } from './user.entity';
import { PostComment } from './post-comment.entity';

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ name: 'post_text', type: 'text', nullable: true })
    @Field(() => String, { nullable: true })
    postText: string;

    @OneToMany(() => File, (image) => image.post, { cascade: true })
    @Field(() => [File])
    images: File[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @OneToMany(() => PostComment, (comment) => comment.post)
    comments: PostComment[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'post_like', // Name of the intermediate table
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    @Field(() => [User])
    likes: User[];

    @Field(() => Int)
    totalComments: number;

    @Field(() => Int)
    totalLikes: number;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
