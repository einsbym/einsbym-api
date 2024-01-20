import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

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
}
