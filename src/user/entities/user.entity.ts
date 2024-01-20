import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Image } from 'src/image/entities/image.entity';
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

    @Column()
    @Field(() => String)
    username: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    bio?: string;

    @Column({ name: 'profile_picture', nullable: true })
    @Field(() => String, { nullable: true })
    profilePicture?: string;

    @OneToMany(() => Image, (image) => image.user)
    @Field(() => [Image], { nullable: true })
    images: Image[];

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: number;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: number;
}
