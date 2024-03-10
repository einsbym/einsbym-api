import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Image {
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
