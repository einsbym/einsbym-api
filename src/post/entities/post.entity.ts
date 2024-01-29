import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Column({ name: 'post_text', type: 'text', nullable: true })
    postText: string;

    @OneToMany(() => Image, (image) => image.post, { cascade: true })
    images: Image[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
