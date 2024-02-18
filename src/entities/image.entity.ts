import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
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

    @ManyToOne(() => Post, (post) => post.images)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
