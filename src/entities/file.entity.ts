import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class File {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    filename: string;

    @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    @Field(() => Post)
    post: Post;
}
