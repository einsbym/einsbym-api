import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
@ObjectType()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    filename: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column({ type: 'jsonb' })
    @Field(() => [String])
    tags: string[];

    @Column({ nullable: true, default: 0 })
    @Field(() => Int, { nullable: true })
    likes?: number;

    @Column({ nullable: true, default: 0 })
    @Field(() => Int, { nullable: true })
    views?: number;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: number;

    @ManyToOne(() => Post, (post) => post.images)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
