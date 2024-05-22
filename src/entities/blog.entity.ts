import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: false })
    @Field(() => String)
    title: string;

    @Column({ nullable: false })
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => String)
    filename: string;

    @Column({ type: 'json', nullable: false })
    @Field(() => String)
    body: string;

    @Column({ default: 0 })
    @Field(() => Int)
    views: number;

    @Column({ name: 'is_published', default: true })
    @Field(() => Boolean)
    isPublished: boolean;

    @Column({ type: 'json' })
    @Field(() => [String])
    tags: string[];

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}
