import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
class Body {
    @Field(() => String)
    time: String;

    @Field(() => [Block])
    blocks: Block[];

    @Field(() => String)
    version: string;
}

@ObjectType()
class Data {
    @Field(() => String)
    text: string;

    @Field(() => Int, { nullable: true })
    level: number;
}

@ObjectType()
class Block {
    @Field(() => String)
    id: string;

    @Field(() => String)
    type: string;

    @Field(() => Data)
    data: Data;
}

@Entity()
@ObjectType()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: false, unique: true })
    @Field(() => String)
    title: string;

    @Column({ nullable: false, unique: true })
    @Field(() => String)
    slug: string;

    @Column({ nullable: false })
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => String)
    filename: string;

    @Column({ type: 'json', nullable: false })
    @Field(() => Body)
    body: Body;

    @Column({ default: 0 })
    @Field(() => Int)
    views: number;

    @Column({ name: 'is_published', default: true })
    @Field(() => Boolean)
    isPublished: boolean;

    @Column({ type: 'json' })
    @Field(() => [String])
    tags: string[];

    @ManyToOne(() => User, (user) => user.blogPosts)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
